const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-app", "root", "root123456", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
