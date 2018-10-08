module.exports = (router) => {
  router.prefix('/v1')
  router.use('/security', require('./security'))
  router.use('/users', require('./users'))
}
