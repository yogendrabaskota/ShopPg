import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";

const generateToken = (userId: string) => {
  const token = jwt.sign(
    {
      data: userId,
    },
    envConfig.jwtSecretKey as string,
    {
      expiresIn: envConfig.jwtExpiresIn ,
    } as jwt.SignOptions
  );
  return token;

};

export default generateToken;
