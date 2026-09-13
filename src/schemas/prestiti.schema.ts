import { z } from "zod";

export const creaPrestitoSchema = z.object({
    libro_id: z
        .number()
        .int()
        .positive(),

    nome_utente: z
        .string()
        .trim()
        .min(1, "Il nome utente è obbligatorio")
});

export const restituzioneSchema = z.object({
    libro_id: z
        .number()
        .int()
        .positive()
});