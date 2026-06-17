import {getEquipmentCategories, getEquipmentCategoryById, createEquipmentCategory, updateEquipmentCategory,  deleteEquipmentCategory}from '../controllers/equipmentCategories.controller'
import { Router } from 'express'
const router = Router()

router.get('/', getEquipmentCategories)
router.get('/:id', getEquipmentCategoryById)
router.post('/', createEquipmentCategory)
router.put('/:id', updateEquipmentCategory)
router.delete('/:id', deleteEquipmentCategory)

export default router

