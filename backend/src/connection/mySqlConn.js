const mysql = require("mysql");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

module.exports = db = {};

const { host, user, password, database } = config.database;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.notes = require("../models/notes")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync completed!");
});
