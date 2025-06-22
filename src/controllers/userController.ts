import { Request, Response } from "express";
import User from "../database/models/userModels";
import bcrypt from "bcrypt";
import generateToken from "../services/generateToken";
import { generateOtp } from "../services/generateOtp";
import { sendMail } from "../services/sendMail";


class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({
          message: "All fields are required",
        });
        return;
      }
      const [data] = await User.findAll({
        where: {
          email: email,
        },
      });
      if (data) {
        res.status(400).json({
          message: "User already exists",
        });
        return;
      }
      const user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      res.status(201).json({
        message: "User created successfully",
        data : user
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          message: "All fields are required",
        });
        return;
      }

      const [user] = await User.findAll({
        where: {
          email: email,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          message: "Invalid password",
        });
        return;
      }
      const token = generateToken(user.id)


      res.status(200).json({
        message: "Login successful",
        token
      });
    } catch (error) {
      console.log(error);
    }


  }
  static async forgetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          message: "Email is required",
        });
        return;
      }

      const [user] = await User.findAll({
        where: {
          email: email,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }
      const otp = generateOtp()
      await sendMail({
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP to reset password is \n ${otp}`,
      })
      res.status(200).json({
        message: "OTP sent to your email",
      });
    } catch (error) {
      console.log(error);
    }
  
  }
}
export default UserController;
