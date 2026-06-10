import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import prisma from './db'

import photosRoute from './routes/photos.route'


const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API działa!' })
})

app.use('/photos', photosRoute)


app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`)
})