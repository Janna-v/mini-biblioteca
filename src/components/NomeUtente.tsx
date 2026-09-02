interface Props {
    nome: string;
    onCambioNome: (nome: string) => void;
}

function NomeUtente({ nome, onCambioNome }: Props) {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <label
                    htmlFor="nomeUtente"
                    className="form-label fw-semibold"
                >
                    Il tuo nome
                </label>

                <input
                    id="nomeUtente"
                    className="form-control"
                    type="text"
                    placeholder="Inserisci il tuo nome"
                    value={nome}
                    onChange={(e) => onCambioNome(e.target.value)}
                />

                <div className="form-text">
                    Inserisci il nome prima di richiedere un prestito.
                </div>
            </div>
        </div>
    );
}

export default NomeUtente;