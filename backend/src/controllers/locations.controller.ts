import { Request, Response } from 'express';
import prisma from '../db';

export const getLocations = async (req: Request, res: Response) => {
    try {
        const locations = await prisma.locations.findMany();
        res.json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Wystąpił błąd podczas pobierania lokalizacji' });
    }
};

export const getLocationById = async (req: Request, res: Response) => {
    try {
        const location = await prisma.locations.findUnique({
            where: { id: Number(req.params.id)  },
        });
        if (location) {
            res.json(location);
        }
        else {
            res.status(404).json({ message: 'Lokalizacja nie znaleziona' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Wystąpił błąd podczas pobierania lokalizacji' });
    }
};

export const createLocation = async (req: Request, res: Response) => {
    try {
        const { name, latitude, longitude } = req.body;
        if (!name || latitude === undefined || longitude === undefined) {
            res.status(400).json({ message: 'Nazwa, szerokość i długość geograficzna są wymagane' });
            return;
        } else if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            res.status(400).json({ message: 'Szerokość i długość geograficzna muszą być liczbami' });
            return;
        }
        const newLocation = await prisma.locations.create({
            data: { name, latitude, longitude },
        });
        res.status(201).json(newLocation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Wystąpił błąd podczas tworzenia lokalizacji' });
    }
};

export const updateLocation = async (req: Request, res: Response) => {
    try {
        const { name, latitude, longitude } = req.body;
        if (!name || latitude === undefined || longitude === undefined) {
            res.status(400).json({ message: 'Nazwa, szerokość i długość geograficzna są wymagane' });
            return;
        } else if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            res.status(400).json({ message: 'Szerokość i długość geograficzna muszą być liczbami' });
            return;
        }
        const updatedLocation = await prisma.locations.update({
            where: { id: Number(req.params.id) },
            data: { name, latitude, longitude },
        });
        res.json(updatedLocation);
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'Nie znaleziono lokalizacji' });
            return;
        }
        console.error(error);
        res.status(500).json({ message: 'Wystąpił błąd podczas aktualizacji lokalizacji' });
    }
};

export const deleteLocation = async (req: Request, res: Response) => {
    try {
        await prisma.locations.delete({ 
            where: { id: Number(req.params.id) },
        });
        res.status(204).send();
    } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Nie znaleziono lokalizacji' })
      return
    }
    else if (error.code === 'P2003') {
      res.status(400).json({ message: 'Nie można usunąć lokalizacji, ponieważ jest przypisana do zdjęć' })
      return
    }
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera' })
  }
};

