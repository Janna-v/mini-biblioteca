import type {
    NextFunction,
    Request,
    Response
} from "express";

import { HttpError } from "../utils/http-error.js";

export function errorMW(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            messaggio: err.message
        });
    }

    return res.status(500).json({
        messaggio: "Errore interno del server"
    });
}