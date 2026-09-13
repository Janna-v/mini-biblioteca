import type { Prestito } from "../types/types.js";
import { pool } from "../db/database.js";
import { HttpError } from "../utils/http-error.js";

export async function creaNuovoPrestito(
    libro_id: number,
    nome_utente: string
): Promise<Prestito> {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const risultatoLibro = await client.query(
            `SELECT *
       FROM libri
       WHERE id = $1
       FOR UPDATE`,
            [libro_id]
        );

        const libro = risultatoLibro.rows[0];

        if (!libro) {
            throw new HttpError(404, "Libro non trovato");
        }

        if (!libro.disponibile) {
            throw new HttpError(400, "Prestito non disponibile");
        }

        await client.query(
            "UPDATE libri SET disponibile = FALSE WHERE id = $1",
            [libro_id]
        );

        const risultato = await client.query<Prestito>(
            `INSERT INTO prestiti (libro_id, nome_utente)
       VALUES ($1, $2)
       RETURNING *`,
            [libro_id, nome_utente]
        );

        await client.query("COMMIT");

        return risultato.rows[0];

    } catch (errore) {
        await client.query("ROLLBACK");
        throw errore;

    } finally {
        client.release();
    }
}

export async function restituisciLibro(
    libro_id: number
): Promise<Prestito> {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const risultatoLibro = await client.query(
            `SELECT *
       FROM libri
       WHERE id = $1
       FOR UPDATE`,
            [libro_id]
        );

        const libro = risultatoLibro.rows[0];

        if (!libro) {
            throw new HttpError(404, "Libro non trovato");
        }

        if (libro.disponibile) {
            throw new HttpError(400, "Restituzione non possibile");
        }

        const risultato = await client.query<Prestito>(
            `UPDATE prestiti
       SET data_fine = CURRENT_TIMESTAMP
       WHERE libro_id = $1
       AND data_fine IS NULL
       RETURNING *`,
            [libro_id]
        );

        const prestito = risultato.rows[0];

        if (!prestito) {
            throw new HttpError(
                404,
                "Prestito attivo non trovato"
            );
        }

        await client.query(
            "UPDATE libri SET disponibile = TRUE WHERE id = $1",
            [libro_id]
        );

        await client.query("COMMIT");

        return prestito;

    } catch (errore) {
        await client.query("ROLLBACK");
        throw errore;

    } finally {
        client.release();
    }
}