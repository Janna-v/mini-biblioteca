CREATE TABLE IF NOT EXISTS libri (
    id SERIAL PRIMARY KEY,
    titolo VARCHAR(255) NOT NULL,
    autore VARCHAR(255) NOT NULL,
    anno_pubblicazione INTEGER NOT NULL,
    disponibile BOOLEAN DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS prestiti (
    id SERIAL PRIMARY KEY,
    libro_id INTEGER NOT NULL REFERENCES libri(id),
    nome_utente VARCHAR(255) NOT NULL,
    data_inizio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fine TIMESTAMP NULL
);
INSERT INTO libri (titolo, autore, anno_pubblicazione)
VALUES ('1984', 'George Orwell', 1949),
    (
        'Il Signore degli Anelli',
        'J.R.R. Tolkien',
        1954
    ),
    ('Orgoglio e pregiudizio', 'Jane Austen', 1813),
    (
        'Il piccolo principe',
        'Antoine de Saint-Exupéry',
        1943
    ),
    (
        'Harry Potter e la pietra filosofale',
        'J.K. Rowling',
        1997
    ),
    ('Il nome della rosa', 'Umberto Eco', 1980),
    ('Frankenstein', 'Mary Shelley', 1818),
    (
        'Uno, nessuno e centomila',
        'Luigi Pirandello',
        1926
    );