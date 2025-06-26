import express from 'express'
const app = express()
import './database/connection'
import userRoutes from './routes/userRoute'


app.use(express.json())

app.use("/api/auth", userRoutes)

export default app

