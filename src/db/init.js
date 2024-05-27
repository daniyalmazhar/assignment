import sequelize from "./config.js";
import userModel from "../model/user/index.js";
const syncDB = async () => {
  await sequelize.sync({ alter: true, force: false });
  await userModel.sync({ alter: true, force: false });
};

export default syncDB;