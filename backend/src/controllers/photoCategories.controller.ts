import { Request, Response } from 'express'
import prisma from '../db'

export const getPhotoCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.photo_categories.findMany()
        res.json(categories)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
}

export const getPhotoCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await prisma.photo_categories.findUnique({
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

export const createPhotoCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        if (!name) {
            res.status(400).json({ message: 'Nazwa kategorii jest wymagana' })
            return
        }
        const newCategory = await prisma.photo_categories.create({
            data: { name }
        })
        res.status(201).json(newCategory)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Błąd serwera' })
    }
}

export const updatePhotoCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        if (!name) {
            res.status(400).json({ message: 'Nazwa kategorii jest wymagana' })
            return
        }
        const updatedCategory = await prisma.photo_categories.update({
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

export const deletePhotoCategory = async (req: Request, res: Response) => {
    try {
        await prisma.photo_categories.delete({
            where: { id: Number(req.params.id) }
        })
        res.status(204).send()
    } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Nie znaleziono kategorii' })
      return
    }
    else if (error.code === 'P2003') {
      res.status(400).json({ message: 'Nie można usunąć kategorii, ponieważ jest przypisana do zdjęć' })
      return
    }
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

