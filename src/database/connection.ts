import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config"

const dbURL:string | undefined  = envConfig.dbUrl

const sequelize = new Sequelize(dbURL as string, {
    models : [__dirname + '/models'],
    dialect: 'postgres'
})
try {
    sequelize.authenticate()
    .then(()=>{
        console.log("Database connected")
    })
    .catch((error) => {
        console.log("Unable to connect to the database:", error)
    })  
} catch (error) {
    console.log("Database connection error:", error)
    
}

sequelize.sync({force : false,alter:false}).then(()=>{
    console.log("synced !!")
})

export default sequelize