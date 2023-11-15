const Sequelize = require('sequelize');
const User = require('./user');
const Board = require('./board');

const fs = require('fs');
const path = require('path');

const process = require('process');
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config.json');
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: 'mysql',
    host: config.host,
  }
)

db.sequelize = sequelize;

db.User = User;
db.Board = Board;

User.init(sequelize);
Board.init(sequelize);

// User.associate(db);
// Board.associate(db);
 
module.exports = db;