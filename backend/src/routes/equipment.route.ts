import { createEquipment, deleteEquipment, getEquipment, getEquipmentById, updateEquipment } from '../controllers/equipment.controller'
import { Router } from 'express'
const router = Router()

router.get('/', getEquipment)
router.get('/:id', getEquipmentById)
router.post('/', createEquipment)
router.put('/:id', updateEquipment)
router.delete('/:id', deleteEquipment)


export default router
