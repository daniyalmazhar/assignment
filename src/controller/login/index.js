import { query } from "express";
import { Op } from "sequelize";
import userModel from "../../model/user/index.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const LoginController = {
  signup: async (req, res) => {
    try {
      const payload = req.body;

      const userCheck = await userModel.findOne({
        where: {
          email: payload.email,
        },
      });
      if (userCheck) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hPassword = await hash(payload.password, 10);

      const user = await userModel.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: hPassword,
      });
      res.json({ message: "User registered successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
        err,
      });
    }
  },

  signin: async (req, res) => {
    try {
      const payload = req.body;
      const userCheck = await userModel.findOne({
        where: {
          email: payload.email,
        },
      });
      if (!userCheck) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      const comparePassword = await compare(
        payload.password,
        userCheck.password
      );
      if (!comparePassword) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const data = {
        id: userCheck.id,
        firstName: userCheck.firstName,
        email: userCheck.email,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      res.json({ data, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

export default LoginController;
