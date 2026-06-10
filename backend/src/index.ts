import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import prisma from './db'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API działa!' })
})

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`)
})