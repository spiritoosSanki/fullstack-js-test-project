const Router = require('koa-router')
const router = new Router()
const Users = require('../controllers/users')

router.get('/', Users.get)
router.put('/', Users.create)
router.post('/', Users.update)
router.del('/:id', Users.remove)
 
module.exports = router.routes()
