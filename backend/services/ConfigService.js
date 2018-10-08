const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

const configService = new function(ennv, configz) {
	var _env = ennv;
	this.config = configz;
}(env, config);

module.exports = configService;