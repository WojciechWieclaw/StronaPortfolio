import {createPhoto, deletePhoto, getPhotoById, getPhotos, updatePhoto} from '../controllers/photos.controller'
import { Router } from 'express'
const router = Router()

router.get('/', getPhotos)
router.get('/:id', getPhotoById)
router.post('/', createPhoto)
router.put('/:id', updatePhoto)
router.delete('/:id', deletePhoto)


export default router