import { Request, Response } from 'express';
import prisma from "../db";

export const getPhotoEquipment = async (req: Request, res: Response) => {
    try {
        const photoId = Number(req.params.photoId)
        const photo = await prisma.photos.findUnique({
            where: { id: photoId }
        })
        if (!photo) {
            res.status(404).json({ message: 'Nie znaleziono zdjęcia' })
            return
        }
        const photoEquipment = await prisma.photo_equipment.findMany({
            where: { photo_id: photoId },
            include: { equipment: true }
        })
        res.json(photoEquipment)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
}

export const addEquipmentToPhoto = async (req: Request, res: Response) => {
    try {
        const { photoId } = req.params
        const { equipment_id } = req.body
        if (!equipment_id) {
            res.status(400).json({ message: 'ID sprzętu jest wymagane' })
            return
        }
        const newPhotoEquipment = await prisma.photo_equipment.create({
            data: {
                photo_id: Number(photoId),
                equipment_id: Number(equipment_id)
            }
        })
        res.status(201).json(newPhotoEquipment)
    }
    catch (error: any) {
        if (error.code === 'P2003') {
            res.status(400).json({ message: 'Nie można dodać sprzętu do zdjęcia, ponieważ przypisany sprzęt lub zdjęcie nie istnieje' })
            return
        }
        if (error.code === 'P2002') {
            res.status(409).json({ message: 'Ten sprzęt jest już przypisany do tego zdjęcia' })
            return
        }
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
};

export const removeEquipmentFromPhoto = async (req: Request, res: Response) => {
    try {
        const { photoId, equipmentId } = req.params
        await prisma.photo_equipment.delete({
            where: {
                photo_id_equipment_id: {
                    photo_id: Number(photoId),
                    equipment_id: Number(equipmentId)
                }
            }
        })
        res.status(204).send()
    }
    catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'Nie znaleziono przypisanego sprzętu do zdjęcia' })
            return
        }
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
};

