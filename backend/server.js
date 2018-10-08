const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const jwt = require('koa-jwt');
const config = require('./services/ConfigService').config;
const adminDbService = require('./services/AdminDbService');


const app = new Koa()
const router = new Router()

app.use(Helmet())

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
  return next().catch((err) => {
    console.log(err);
    if(401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        responseCode: 2,
        responseMessage: "Wrong or out dated authentication"
      }
    } else if(403 == err.status) {
      ctx.status = 403;
      ctx.body = {
        responseCode: 3,
        responseMessage: "Protected resource or operation not allowed"
      }
    } else if(err.name === "SequelizeValidationError") { //TODO use typeof
      ctx.status = 400;
      ctx.body = {
        responseCode: 1,
        responseMessage: "Validation error(s)",
        errors: err.errors.map(e => {return {param: e.path, message: e.message}})
      }
    } else if(err.name === "FullstackError") {  //TODO after creating an error class, use typeof
      if(err.statusCode) {
        ctx.status = err.statusCode
      } else {
        ctx.status = 400;
      }
      ctx.body = {
        responseCode: 1,
        responseMessage: "Error(s)",
        errors: err.errors
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        responseCode: 1,
        responseMessage: "Something went wrong"
      }
    }
  });
});

app.use(jwt({ secret: config.security.sessionTokenSecret }).unless({ path: [/^\/v1\/security\/login/] }));

// Unprotected middleware
/*app.use(function(ctx, next){
  if (ctx.url.match(/^\/v1\/security\/login/)) {
  	ctx.body = 'unprotected\n';
  } else {
    return next();
  }
});*/

//TODO create a middleware to log users actions

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

app.use(respond())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(require('koa-static')('./build'))
app.use(router.allowedMethods())

try {
  console.log('DB connection ...');
  adminDbService.init();
  console.log('DB connection has been established successfully.');
} catch(err) {
  console.error('Unable to connect to the Admin DB:', err);
}


module.exports = app
