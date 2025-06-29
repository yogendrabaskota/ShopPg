import express from 'express'
const app = express()
import './database/connection'
import userRoutes from './routes/userRoute'
import categoryRoute from './routes/categoryRoute'


app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/category", categoryRoute)

export default app

