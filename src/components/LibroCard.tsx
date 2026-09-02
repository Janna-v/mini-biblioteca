import type { Libro } from "../types/Libro";

interface Props {
    libro: Libro;
    onPrestito: (id: number) => void;
    onRestituzione: (id: number) => void;
}

function LibroCard({
    libro,
    onPrestito,
    onRestituzione
}: Props) {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">

                <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="card-title h5 mb-0">
                        {libro.titolo}
                    </h3>

                    <span
                        className={
                            libro.disponibile
                                ? "badge text-bg-success"
                                : "badge text-bg-secondary"
                        }
                    >
                        {libro.disponibile
                            ? "Disponibile"
                            : "In prestito"}
                    </span>
                </div>

                <p className="card-text mb-2">
                    <strong>Autore:</strong> {libro.autore}
                </p>

                <p className="card-text text-body-secondary">
                    <strong>Anno:</strong> {libro.anno_pubblicazione}
                </p>

                <div className="mt-auto pt-3">
                    {libro.disponibile ? (
                        <button
                            className="btn btn-primary w-100"
                            onClick={() => onPrestito(libro.id)}
                        >
                            Richiedi prestito
                        </button>
                    ) : (
                        <button
                            className="btn btn-outline-secondary w-100"
                            onClick={() => onRestituzione(libro.id)}
                        >
                            Restituisci
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

export default LibroCard;