import { create } from "zustand";
import type { Libro } from "../types/Libro";

interface BibliotecaStore {
    libri: Libro[];
    loading: boolean;
    error: string | null;

    setLibri: (libri: Libro[]) => void;

    fetchLibri: () => Promise<void>;

    richiediPrestito: (
        libroId: number,
        nomeUtente: string
    ) => Promise<void>;

    restituisciPrestito: (
        libroId: number
    ) => Promise<void>;
}

export const useBibliotecaStore = create<BibliotecaStore>((set) => ({
    libri: [],
    loading: false,
    error: null,

    setLibri: (libri) => {
        set({ libri });
    },

    fetchLibri: async () => {
        set({
            loading: true,
            error: null
        });

        try {
            const response = await fetch(
                "http://localhost:3000/api/libri"
            );

            if (!response.ok) {
                throw new Error("Errore nel caricamento dei libri");
            }

            const dati = await response.json();

            set({
                libri: dati
            });

        } catch (errore) {
            const messaggio =
                errore instanceof Error
                    ? errore.message
                    : "Errore nel caricamento dei libri";

            set({
                error: messaggio
            });

        } finally {
            set({
                loading: false
            });
        }
    },

    richiediPrestito: async (libroId, nomeUtente) => {
        const response = await fetch(
            "http://localhost:3000/api/prestiti",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    libro_id: libroId,
                    nome_utente: nomeUtente
                })
            }
        );

        if (!response.ok) {
            const errore = await response.json();
            throw new Error(errore.messaggio);
        }

        set((state) => ({
            libri: state.libri.map((libro) =>
                libro.id === libroId
                    ? { ...libro, disponibile: false }
                    : libro
            )
        }));
    },

    restituisciPrestito: async (libroId) => {
        const response = await fetch(
            "http://localhost:3000/api/prestiti/restituzione",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    libro_id: libroId
                })
            }
        );

        if (!response.ok) {
            const errore = await response.json();
            throw new Error(errore.messaggio);
        }

        set((state) => ({
            libri: state.libri.map((libro) =>
                libro.id === libroId
                    ? { ...libro, disponibile: true }
                    : libro
            )
        }));
    }
}));