import LoginController from "../../controller/login/index.js";
import { Router } from "express";

const LoginRouter = Router();

LoginRouter.post("/login/signup", LoginController.signup);

LoginRouter.post("/login/signin", LoginController.signin);

export default LoginRouter;
