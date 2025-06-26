import { envConfig } from "./src/config/config"
import User from "./src/database/models/userModels"
import bcrypt from 'bcrypt'

const adminSeeder = async() =>{
    const [adminFound] = await User.findAll({
        where : {
            email : envConfig.adminEmail
        }
    })
    if(adminFound){
        console.log("admin already seeded")
    }else{
        User.create({
            username : envConfig.adminName,
            password : bcrypt.hashSync(envConfig.adminPassword as string,10),
            email : envConfig.adminEmail,
            role : 'admin'
        })
        console.log("admin seeded successfully")
    }
}

export default adminSeeder