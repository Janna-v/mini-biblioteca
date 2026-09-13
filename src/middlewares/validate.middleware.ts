import type {
    NextFunction,
    Request,
    Response
} from "express";

import type { ZodType } from "zod";
import { ZodError } from "zod";

export function validateBody(schema: ZodType) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (errore) {
            if (errore instanceof ZodError) {
                return res.status(400).json({
                    messaggio: "Dati non validi",
                    errori: errore.issues
                });
            }

            next(errore);
        }
    };
}