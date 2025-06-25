import { Request, Response } from "express";
import User from "../database/models/userModels";
import bcrypt from "bcrypt";
import generateToken from "../services/generateToken";
import { generateOtp } from "../services/generateOtp";
import { sendMail } from "../services/sendMail";
import findData from "../services/findData";
import sendResponse from "../services/sendResponse";
import checkOtpExpiration from "../services/checkOtpExpiration";


class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        sendResponse(res,400,"All fields are required")
        return;
      }
      const [data] = await User.findAll({
        where: {
          email: email,
        },
      });
      if (data) {
        sendResponse(res,400,"User already exists")
        return;
      }
      const user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      sendMail({
        to: email,
        subject: "Welcome to Our Service",
       // text: `Hello ${username},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\n Our Team`,
        html: `<p>Hello <strong>${username}</strong>,</p><p>Thank you for registering with us! We're excited to have you on board.</p><p>Best regards,<br> Our Team</p>`,
      
      })


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
        sendResponse(res,400,"All fields are required")
        return;
      }

      const [user] = await User.findAll({
        where: {
          email: email,
        },
      });

      if (!user) {
        sendResponse(res,404,"User not found")
        return;
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        sendResponse(res,401,"invalid password")
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
        sendResponse(res,400,"Email is required")
        return;
      }

      const [user] = await User.findAll({
        where: {
          email: email,
        },
      });
      //const user = findData(User,email)

      if (!user) {
        sendResponse(res,404,"user not found")
        return;
      }
      const otp = generateOtp()
      await sendMail({
        to: email,
        subject: "Password Reset OTP",
        //text: `Your OTP to reset password is \n ${otp}`,
        html : `<p>Your OTP to reset password is \n <strong>${otp}</strong></p>\n please note that opt will expire after 2 min from now`,
      })

      user.otp = otp.toString()
      user.otpGenerationTime = Date.now().toString()
      await user.save()

    sendResponse(res,200,"otp send to your email")
    } catch (error) {
      console.log(error);
    }
  
  }

  static async verifyOtp(req:Request,res:Response):Promise<void>{
    const {otp,email} = req.body
    if(!otp || !email){
      sendResponse(res,400,"Please provide email and otp")
      return
    }
    const user = await findData(User,email)
    
    if(!user){
      sendResponse(res,400,"No user found")
      return
    }
    const [data] = await User.findAll({
      where : {
        email,
        otp : String(otp)
      
      }
    })
   // console.log(data)
    if(!data){
      sendResponse(res,404,"Invalid otp")
      return
    }

    const otpGeneratedTime = data.otpGenerationTime
    checkOtpExpiration(res,otpGeneratedTime,120000)
    // if(checkOtpExpiration(res,otpGeneratedTime,120000)){
    //   sendResponse(res,200,"Valid otp")
    // }else{
    //   sendResponse(res,403,"Your Otp is already expired")

    // }
    //sendResponse(res,200,"valid OTP")


  }
//   static async verifyOtp(req: Request, res: Response): Promise<void> {
//   try {
//     const { otp, email } = req.body;

//     if (!otp || !email) {
//       sendResponse(res, 400, "Please provide email and OTP");
//       return;
//     }

//     const user = await findData(User, email); // your custom function?

//     if (!user) {
//       sendResponse(res, 400, "No user found");
//       return;
//     }

//     const data = await User.findOne({
//       where: {
//         email,
//         otp : String(otp)
//       }
//     });

//     console.log("OTP match result:", data);

//     if (!data) {
//       sendResponse(res, 404, "Invalid OTP");
//       return;
//     }

//     const otpGeneratedTime = data.otpGenerationTime;

//     checkOtpExpiration(res, otpGeneratedTime, 120000); // 2 minutes
//   } catch (err) {
//     console.error("Error verifying OTP:", err);
//     sendResponse(res, 500, "Server error while verifying OTP");
//   }
// }



}
export default UserController;
