import dotenv from 'dotenv'
dotenv.config()

export const envConfig = {

    port : process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
}