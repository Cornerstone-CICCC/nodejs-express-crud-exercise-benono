import express, { NextFunction, Request, Response } from "express"
import productRouter from "./routes/product.routes"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())
app.use("/api/products", productRouter)

const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
