import { getPhotoEquipment, addEquipmentToPhoto, removeEquipmentFromPhoto } from "../controllers/photo_equipment.controller";
import { Router } from "express";
const router = Router();

router.get('/:photoId', getPhotoEquipment)
router.post('/:photoId', addEquipmentToPhoto)
router.delete('/:photoId/:equipmentId', removeEquipmentFromPhoto)

export default router