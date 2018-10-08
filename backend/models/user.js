const Sequelize = require('sequelize');
const {sequelize} = require('../services/AdminDbService');
const config = require('../services/ConfigService').config;

const TYPE_ADMIN = 'TYPE_ADMIN';
const TYPE_USER = 'TYPE_USER';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [[TYPE_ADMIN, TYPE_USER]]
    }
  }
});

config.orm.createTable && User.sync();

module.exports = {
  User, TYPE_ADMIN, TYPE_USER
}
