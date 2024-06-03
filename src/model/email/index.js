import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
const sequelize = require('../config/config');

const Email = sequelize.define('Email', {
  to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Email;
