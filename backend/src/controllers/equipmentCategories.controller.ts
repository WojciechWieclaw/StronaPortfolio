import { Request, Response } from 'express'
import prisma from '../db'

export const getEquipmentCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.equipment_categories.findMany()
        res.json(categories)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
}

export const getEquipmentCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await prisma.equipment_categories.findUnique({
            where: { id: Number(req.params.id) }
        })
        if (category) {
            res.json(category)
        } else {
            res.status(404).json({ message: 'Nie znaleziono kategorii' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
}

export const createEquipmentCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        if (!name) {
            res.status(400).json({ message: 'Nazwa kategorii jest wymagana' })
            return
        }
        const newCategory = await prisma.equipment_categories.create({
            data: { name }
        })
        res.status(201).json(newCategory)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
}

export const updateEquipmentCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        if (!name) {
            res.status(400).json({ message: 'Nazwa kategorii jest wymagana' })
            return
        }
        const updatedCategory = await prisma.equipment_categories.update({
            where: { id: Number(req.params.id) },
            data: { name }
        })
        res.json(updatedCategory)
    } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Nie znaleziono kategorii' })
      return
    }
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

export const deleteEquipmentCategory = async (req: Request, res: Response) => {
    try {
        await prisma.equipment_categories.delete({
            where: { id: Number(req.params.id) }
        })
        res.status(204).send()
    } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Nie znaleziono kategorii' })
      return
    }
    else if (error.code === 'P2003') {
      res.status(400).json({ message: 'Nie można usunąć kategorii, ponieważ jest przypisana do sprzętu' })
      return
    }
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

