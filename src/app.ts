import express from 'express'
const app = express()
import './database/connection'


app.use(express.json())

import userRoutes from './routes/userRoute'

app.use("/api/auth", userRoutes)

export default app

