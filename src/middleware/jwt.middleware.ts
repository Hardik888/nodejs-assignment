import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
const secretKey = "your_secret_key"; // Replace with your actual secret key

class JWTMiddleware {
  static jwtsecret = config.express.jwt.secret;
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, this.jwtsecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.body = decoded;
      next();
    });
  }
}

export default JWTMiddleware;
