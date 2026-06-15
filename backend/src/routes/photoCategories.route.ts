import {getPhotoCategories, getPhotoCategoryById, createPhotoCategory, updatePhotoCategory, deletePhotoCategory} from '../controllers/photoCategories.controller'
import { Router } from 'express'
const router = Router()

router.get('/', getPhotoCategories)
router.get('/:id', getPhotoCategoryById)
router.post('/', createPhotoCategory)
router.put('/:id', updatePhotoCategory)
router.delete('/:id', deletePhotoCategory)

export default router

