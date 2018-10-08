const Router = require('koa-router')
const router = new Router()
const Security = require('../controllers/security')

router.post('/login', Security.login)
router.post('/checkSession', Security.checkSession)

module.exports = router.routes()
