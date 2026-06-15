import { Request, Response } from 'express';
import prisma from '../db';

export const getLocations = async (req: Request, res: Response) => {
    try {
        const locations = await prisma.locations.findMany();
        res.json(locations);
    } catch (error) {
        console.error('Błąd podczas pobierania lokalizacji:', error);
        res.status(500).json({ error: 'Wystąpił błąd podczas pobierania lokalizacji' });
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
            res.status(404).json({ error: 'Lokalizacja nie znaleziona' });
        }
    } catch (error) {
        console.error('Błąd podczas pobierania lokalizacji:', error);
        res.status(500).json({ error: 'Wystąpił błąd podczas pobierania lokalizacji' });
    }
};

