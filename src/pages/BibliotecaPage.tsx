import { useEffect, useState } from "react";
import CatalogoLibri from "../components/CatalogoLibri";
import NomeUtente from "../components/NomeUtente";
import { useBibliotecaStore } from "../stores/biblioteca";

function BibliotecaPage() {
    const libri = useBibliotecaStore((state) => state.libri);
    const loading = useBibliotecaStore((state) => state.loading);
    const error = useBibliotecaStore((state) => state.error);

    const fetchLibri = useBibliotecaStore(
        (state) => state.fetchLibri
    );

    const richiediPrestito = useBibliotecaStore(
        (state) => state.richiediPrestito
    );

    const restituisciPrestito = useBibliotecaStore(
        (state) => state.restituisciPrestito
    );

    const [nomeUtente, setNomeUtente] = useState("");

    useEffect(() => {
        void fetchLibri();
    }, [fetchLibri]);

    async function gestisciPrestito(libroId: number) {
        if (!nomeUtente.trim()) {
            alert("Inserisci il tuo nome");
            return;
        }

        try {
            await richiediPrestito(libroId, nomeUtente);
            setNomeUtente("");
        } catch (errore) {
            const messaggio =
                errore instanceof Error
                    ? errore.message
                    : "Errore durante il prestito";

            alert(messaggio);
        }
    }

    async function gestisciRestituzione(libroId: number) {
        try {
            await restituisciPrestito(libroId);
        } catch (errore) {
            const messaggio =
                errore instanceof Error
                    ? errore.message
                    : "Errore durante la restituzione";

            alert(messaggio);
        }
    }

    return (
        <div className="container py-5">

            <div className="text-center mb-5">
                <h1 className="display-5 fw-bold">
                    Mini Biblioteca
                </h1>

                <p className="text-body-secondary">
                    Consulta il catalogo e gestisci i tuoi prestiti
                </p>
            </div>

            {loading && (
                <div className="text-center py-5">
                    <div
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Caricamento...
                        </span>
                    </div>

                    <p className="mt-3">
                        Caricamento libri...
                    </p>
                </div>
            )}

            {error && (
                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    <h4 className="alert-heading">
                        Errore
                    </h4>

                    <p>{error}</p>

                    <button
                        className="btn btn-danger"
                        onClick={() => void fetchLibri()}
                    >
                        Riprova
                    </button>
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="mb-4">
                        <NomeUtente
                            nome={nomeUtente}
                            onCambioNome={setNomeUtente}
                        />
                    </div>

                    <CatalogoLibri
                        libri={libri}
                        onPrestito={gestisciPrestito}
                        onRestituzione={gestisciRestituzione}
                    />
                </>
            )}

        </div>
    );
}

export default BibliotecaPage;