import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import prisma from './db'

import photosRoute from './routes/photos.route'
import photoCategoriesRoute from './routes/photoCategories.route'
import locationsRoute from './routes/locations.route'
import equipmentCategoriesRoute from './routes/equipmentCategories.route'


const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API działa!' })
})

app.use('/photos', photosRoute)
app.use('/photo-categories', photoCategoriesRoute)
app.use('/locations', locationsRoute)
app.use('/equipment-categories', equipmentCategoriesRoute)


app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`)
})