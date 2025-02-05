import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to db')
  })
  .catch((err) => console.error(' could not connect to db' + err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
