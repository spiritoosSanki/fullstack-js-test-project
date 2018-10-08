const Sequelize = require('sequelize');
const {sequelize} = require('../services/AdminDbService');
const config = require('../services/ConfigService').config;

const ActionLog = sequelize.define('actionLog', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  origin: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  api: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  action: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  object1Label: {
    type: Sequelize.STRING,
    allowNull: true
  },
  object1: {
    type: Sequelize.STRING,
    allowNull: true
  },
  object2Label: {
    type: Sequelize.STRING,
    allowNull: true
  },
  object2: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

config.orm.createTable && ActionLog.sync();

module.exports = {
  ActionLog
}
