
import nodemailer from 'nodemailer';
import { envConfig } from '../config/config';

export const sendMail = async(data : IData)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envConfig.email,
            pass: envConfig.appPassword 
        }

    })
    const mailOptions = {
        from: "Yogendra Baskota<yogendrabaskota18@gmail.com>",
        to: data.to,
        subject: data.subject,
        text: data.text
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }

}

interface IData {
    to : string,
    subject: string,
    text: string
}