import type { Libro } from "../types/types.js";
import { pool } from "../db/database.js";

export async function getTuttiLibri(): Promise<Libro[]> {

    const risultato = await pool.query<Libro>(
        "SELECT * FROM libri ORDER BY id"
    );

    return risultato.rows;
}

export async function trovaLibro(id: number): Promise<Libro | undefined> {

    const risultato = await pool.query<Libro>(
        "SELECT * FROM libri WHERE id = $1",
        [id]
    );

    return risultato.rows[0];
}

export async function getLibriDisponibili(): Promise<Libro[]> {

    const risultato = await pool.query<Libro>(
        "SELECT * FROM libri WHERE disponibile = TRUE ORDER BY id"
    );

    return risultato.rows;
}