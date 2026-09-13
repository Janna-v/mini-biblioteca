import type {
    NextFunction,
    Request,
    Response
} from "express";

import {
    creaNuovoPrestito,
    restituisciLibro
} from "../services/prestiti.service.js";

export async function creaPrestito(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { libro_id, nome_utente } = req.body;

        if (!libro_id || !nome_utente) {
            return res.status(400).json({
                messaggio: "libro_id e nome_utente sono obbligatori"
            });
        }

        const nuovoPrestito = await creaNuovoPrestito(
            libro_id,
            nome_utente
        );

        return res.status(201).json({
            messaggio: "Prestito creato",
            prestito: nuovoPrestito
        });

    } catch (errore) {
        next(errore);
    }
}

export async function restituisciPrestito(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { libro_id } = req.body;

        if (!libro_id) {
            return res.status(400).json({
                messaggio: "libro_id è obbligatorio"
            });
        }

        const prestito = await restituisciLibro(libro_id);

        return res.status(200).json({
            messaggio: "Libro restituito",
            prestito
        });

    } catch (errore) {
        next(errore);
    }
}