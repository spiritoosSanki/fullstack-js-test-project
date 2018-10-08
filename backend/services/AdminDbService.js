const config = require('./ConfigService').config;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.db, config.db.login, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  operatorsAliases: false,
  //logging: console.log,
  pool: config.db.pool
});


async function init() {
	return await sequelize.authenticate();
};
	

module.exports = {
  init, sequelize
}