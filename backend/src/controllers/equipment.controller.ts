import { Request, Response } from 'express';
import prisma from '../db'



export const getEquipment = async (req: Request, res: Response) => {
    try {
        const equipment = await prisma.equipment.findMany()
        res.json(equipment)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
};

export const getEquipmentById = async (req: Request, res: Response) => {
    try {
        const equipment = await prisma.equipment.findUnique({
            where: { id: Number(req.params.id) }
        })
        if (!equipment) {
            res.status(404).json({ message: 'Sprzęt nie znaleziony' })
            return
        }
        res.json(equipment)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
};

export const createEquipment = async (req: Request, res: Response) => {
    try {
        const { name, equipment_category_id } = req.body
        if (!name || !equipment_category_id) {
            res.status(400).json({ message: 'Nazwa i kategoria sprzętu są wymagane' })
            return
        }
        const newEquipment = await prisma.equipment.create({
            data: { name, equipment_category_id }
        })
        res.status(201).json(newEquipment)
    } catch (error: any) {
        if (error.code === 'P2003') {
            res.status(400).json({ message: 'Nie można utworzyć sprzętu, ponieważ przypisana kategoria nie istnieje' })
            return
        }
        else if (error.code === 'P2002') {
            res.status(409).json({ message: 'Sprzęt o tej nazwie już istnieje' })
            return
        }
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
};

export const updateEquipment = async (req: Request, res: Response) => {
    try {
        const { name, equipment_category_id } = req.body
        if (!name || !equipment_category_id) {
            res.status(400).json({ message: 'Nazwa i kategoria sprzętu są wymagane' })
            return
        }
        const updatedEquipment = await prisma.equipment.update({
            where: { id: Number(req.params.id) },
            data: { name, equipment_category_id }
        })
        res.json(updatedEquipment)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'Nie znaleziono sprzętu' })
            return
        }
        else if (error.code === 'P2003') {
            res.status(400).json({ message: 'Nie można zaktualizować sprzętu, ponieważ przypisana kategoria nie istnieje' })
            return
        }
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
};

export const deleteEquipment = async (req: Request, res: Response) => {
    try {
        await prisma.equipment.delete({
            where: { id: Number(req.params.id) }
        })
        res.status(204).send()
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'Nie znaleziono sprzętu' })
            return
        }
        else if (error.code === 'P2003') {
            res.status(400).json({ message: 'Nie można usunąć sprzętu, ponieważ jest przypisany do zdjęć' })
            return
        }
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
};
