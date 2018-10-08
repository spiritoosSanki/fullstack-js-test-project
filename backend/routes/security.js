const Router = require('koa-router')
const router = new Router()
const Security = require('../controllers/security')

router.post('/login', Security.login)
router.post('/createAdmin', Security.createAdmin) //TODO delete after admin has been created
router.post('/checkSession', Security.checkSession)

module.exports = router.routes()
