const SecurityService = require('../services/SecurityService');
const ActionLogService = require('../services/ActionLogService');

const API_SECURITY = "SECURITY";

async function login(ctx) {

  try {
    const user = await SecurityService.checkLoginPassword(ctx.request.body.login, ctx.request.body.password);

    ctx.ok({
      responseCode: 0,
      responseMessage: "Login OK",
      user: user,
      token: SecurityService.createToken(user)
    })
    ActionLogService.log(ActionLogService.ORIGIN_API, API_SECURITY, user, "logged in");
  } catch(err) {
    ctx.status = 401;
    ctx.body = {
      responseCode: 1,
      responseMessage: "Bad login or password"
    }
  }
}

function checkSession(ctx) {
  ctx.ok({
  	responseCode: 0,
  	responseMessage: "Session OK"
  })
}

module.exports = {
  login, checkSession
}
