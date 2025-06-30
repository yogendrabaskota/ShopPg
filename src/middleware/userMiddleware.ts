import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";
import sendResponse from "../services/sendResponse";
import User from "../database/models/userModels";

export enum Roles {
  Admin = "admin",
  Customer = "customer",
}

interface ExtendedRequest extends Request {
  user?: {
    id: string;
    role: Roles;
    email: string;
  };
}

class UserMiddleware {
  async isUserLogin(req: ExtendedRequest,res: Response,next: NextFunction): Promise<void> {
    const token = req.headers.authorization;
    if (!token) {
      res.status(403).json({ message: "Please Login!!" });
      return;
    }
    jwt.verify(
      token,
      envConfig.jwtSecretKey as string,
      async (err, result: any) => {
        if (err) {
          sendResponse(res, 401, "Invalid token");
          return;
        } else {
          const userData = await User.findByPk(result.data);
        //   console.log(userData,"data")
        //   console.log(result,"result")
        //   console.log(result.data,"dataa")
          if (!userData) {
            sendResponse(res, 404, "User not found");
            return;
          }
          req.user = {
            id: userData.id,
            role: userData.role as Roles,
            email: userData.email,
          };

          next();
        }
      }
    )
  }

  accessTo(...roles: Roles[]) {
    return (req: ExtendedRequest, res: Response, next: NextFunction) => {
      const userRole = req.user?.role;
      if (!userRole || !roles.includes(userRole)) {
        sendResponse(res, 403, "Access denied");
        return;
      }
      next();
    };
  }
}
export default new UserMiddleware();
