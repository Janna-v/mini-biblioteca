import type { Request, Response } from "express";
import {
    getTuttiLibri,
    getLibriDisponibili
} from "../services/libri.service.js";

export async function getLibri(req: Request, res: Response) {

    const disponibile = req.query.disponibile;

    if (disponibile === "true") {
        const libri = await getLibriDisponibili();
        return res.status(200).json(libri);
    }

    const libri = await getTuttiLibri();

    return res.status(200).json(libri);
}