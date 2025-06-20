import { Request, Response } from "express";
import User from "../database/models/userModels";

class UserController{
    static async register(req:Request, res:Response):Promise<void> {
        const {username,email,password} = req.body
        
        if(!username || !email || !password){
            res.status(400).json({
                message: "All fields are required"
            });
            return;     
        }
        const [data] = await User.findAll({
            where: {
                email: email
            } 
        })
        if(data){
            res.status(400).json({
                message: "User already exists"
            });
            return;     
        }
        const user = await User.create({
            username,
            email,
            password,
        } as User);
        res.status(201).json({
            message: "User created successfully",
        })
    }
}
export default UserController;