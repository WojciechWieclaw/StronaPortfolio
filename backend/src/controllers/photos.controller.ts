import { Request, Response } from 'express'
import prisma from '../db'

export const getPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await prisma.photos.findMany()
    res.json(photos)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
}