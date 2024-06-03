import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import UserModel from "../user/index.js";

const TokenModel = sequelize.define(
  "Token",
  {
    token: {
      type: DataTypes.STRING(1024), // Increased length
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: 'id',
      },
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export default TokenModel;
