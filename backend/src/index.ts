import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import prisma from './db'

import photosRoute from './routes/photos.route'
import photoCategoriesRoute from './routes/photoCategories.route'
import locationsRoute from './routes/locations.route'
import equipmentCategoriesRoute from './routes/equipmentCategories.route'
import equipmentRoute from './routes/equipment.route'
import photo_equipmentRoute from './routes/photo_equipment.route'


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
app.use('/equipment', equipmentRoute)
app.use('/photos/:photoId/equipment', photo_equipmentRoute)


app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`)
})