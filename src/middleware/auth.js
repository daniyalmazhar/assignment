import jwt from "jsonwebtoken";
import TokenModel from "../model/token/index.js";

const AuthenticateMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "UnAuthorized" });
  }

  try {
    const decoded = jwt.verify(token, "asdbavsdasvd");

    const storedToken = await TokenModel.findOne({
      where: {
        token,
        userId: decoded.id,
      },
    });

    if (!storedToken || new Date() > new Date(storedToken.expiresAt)) {
      return res.status(401).json({ message: "UnAuthorized" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "UnAuthorized" });
  }
};

export default AuthenticateMiddleware;
