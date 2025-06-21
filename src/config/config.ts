import dotenv from 'dotenv'
dotenv.config()

export const envConfig = {

    port : process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
    jwtSecretKey: process.env.JWT_SECRET_KEY || 'defaultSecretKey'  ,
    jwtExpiresIn: process.env.JWT_EXPIRATION_TIME 
}

