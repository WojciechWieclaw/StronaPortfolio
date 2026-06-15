import { Request, Response } from 'express'
import prisma from '../db'

export const getPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await prisma.photos.findMany()
    res.json(photos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

export const getPhotoById = async (req: Request, res: Response) => {
  try {
    const photo = await prisma.photos.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (photo) {
      res.json(photo)
    } else {
      res.status(404).json({ message: 'Nie znaleziono zdjęcia' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

export const createPhoto = async (req: Request, res: Response) => {
  try {
    const { title, url, description, date, photo_category_id, location_id } = req.body
    if (!title || !url || !date) {
      res.status(400).json({ message: 'Tytuł, URL i data są wymagane' })
      return
    }
    const newPhoto = await prisma.photos.create({
      data: {
        title,
        url,
        description,
        date: new Date(date),
        photo_category_id,
        location_id
      }
    })
    res.status(201).json(newPhoto)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

export const updatePhoto = async (req: Request, res: Response) => {
  try {
    const { title, url, description, date, photo_category_id, location_id } = req.body
    if (!title || !url) {
      res.status(400).json({ message: 'Tytuł i URL są wymagane' })
      return
    }
    const updatedPhoto = await prisma.photos.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        title,
        url,
        description,
        ...(date && { date: new Date(date) }),
        photo_category_id,
        location_id
      }
    })
    res.json(updatedPhoto)
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Nie znaleziono zdjęcia' })
      return
    }
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}

export const deletePhoto = async (req: Request, res: Response) => {
  try {
    await prisma.photos.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(204).send()
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Nie znaleziono zdjęcia' })
      return
    }
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}