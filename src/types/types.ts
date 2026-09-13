export interface Libro {
    id: number;
    titolo: string;
    autore: string;
    anno_pubblicazione: number;
    disponibile: boolean;
}

export interface Prestito {
    id: number;
    libro_id: number;
    nome_utente: string;
    data_inizio: string;
    data_fine: string | null;
}