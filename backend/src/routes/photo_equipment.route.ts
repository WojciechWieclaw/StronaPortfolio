import { getPhotoEquipment, addEquipmentToPhoto, removeEquipmentFromPhoto } from "../controllers/photo_equipment.controller";
import { Router } from "express";
const router = Router({ mergeParams: true});

router.get('/', getPhotoEquipment)
router.post('/', addEquipmentToPhoto)
router.delete('/:equipmentId', removeEquipmentFromPhoto)

export default router