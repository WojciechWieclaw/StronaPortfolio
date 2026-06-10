import {getPhotos} from '../controllers/photos.controller'
import { Router } from 'express'
const router = Router()

router.get('/', getPhotos)

export default router