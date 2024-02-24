import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const CONNECTION_STRING = process.env.DB_URL

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log('Server connected to DB')
  })
  .catch(() => {
    console.log('Server failed to connect to DB')
  })

export default mongoose
