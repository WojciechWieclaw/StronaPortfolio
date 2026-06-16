import {getLocations, getLocationById, createLocation, updateLocation, deleteLocation} from '../controllers/locations.controller'
import { Router } from 'express'

const router = Router();

router.get('/', getLocations);
router.get('/:id', getLocationById);
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;