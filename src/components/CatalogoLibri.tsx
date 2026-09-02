import type { Libro } from "../types/Libro";
import LibroCard from "./LibroCard";

interface Props {
    libri: Libro[];
    onPrestito: (id: number) => void;
    onRestituzione: (id: number) => void;
}

function CatalogoLibri({
    libri,
    onPrestito,
    onRestituzione
}: Props) {
    return (
        <div>
            <h2 className="mb-4">
                Catalogo libri
            </h2>

            <div className="row g-4">
                {libri.map((libro) => (
                    <div
                        className="col-12 col-md-6 col-lg-4"
                        key={libro.id}
                    >
                        <LibroCard
                            libro={libro}
                            onPrestito={onPrestito}
                            onRestituzione={onRestituzione}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CatalogoLibri;