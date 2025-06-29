import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { envConfig } from "../config/config";
import sendResponse from "../services/sendResponse";


class UserMiddleware{
    async isUserLogin(req:Request, res:Response, next:NextFunction):Promise<void>{
        const token = req.headers.authorization
        if (!token) {
            res.status(403).json({ message: "Please Login!!" });
            return;
        }
        jwt.verify(token, envConfig.jwtSecretKey as string, (err: any,result : any) => {
            if (err) {
               sendResponse(res, 401, "Invalid token")
                return
            }
           
        })
        next()

    }

}
export default new UserMiddleware