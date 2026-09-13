# Mini Biblioteca

Progetto individuale full stack per consultare un catalogo di libri, verificarne la disponibilità, richiedere prestiti e registrare restituzioni.

## Architettura e tecnologie

Frontend React e TypeScript → API REST Node.js/Express e TypeScript → PostgreSQL.

Il frontend usa Vite, Bootstrap e Zustand. Il backend usa `pg` per il database, Zod per la validazione, dotenv per le variabili ambiente e middleware per CORS, log e gestione degli errori. I test backend usano Vitest e Supertest.

## Struttura

```text
mini-biblioteca/
├── frontend/          # React, componenti, pagine e store Zustand
├── src/               # Backend Express
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── db/
│   ├── schemas/
│   ├── middlewares/
│   └── tests/
├── sql/database.sql   # Tabelle e catalogo iniziale
├── package.json       # Dipendenze e test backend
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

Il backend rimane in `src/` nella root per conservare i percorsi e la configurazione originali. La root Git comprende l'intero progetto.

## Funzionalità e API

- Visualizzazione del catalogo e della disponibilità dei libri.
- Richiesta di un prestito con il nome dell'utente.
- Restituzione di un libro e aggiornamento della disponibilità.

| Metodo | Endpoint | Scopo |
| --- | --- | --- |
| GET | `/api/libri` | Elenco libri; il parametro `disponibile=true` seleziona quelli disponibili. |
| POST | `/api/prestiti` | Richiede un prestito con JSON `libro_id` e `nome_utente`. |
| POST | `/api/prestiti/restituzione` | Registra la restituzione con JSON `libro_id`. |

## Configurazione locale

Servono Node.js compatibile con le dipendenze bloccate nei lockfile, npm e PostgreSQL. Per Vite 8 usare Node.js 20.19+ oppure 22.12+ compatibile; è consigliato Node.js 22 aggiornato.

Creare nella root una copia di `.env.example` chiamata `.env`, senza sovrascrivere un file locale esistente. Compilare:

| Variabile | Significato |
| --- | --- |
| `DB_USER` | Utente PostgreSQL locale. |
| `DB_HOST` | Host PostgreSQL, normalmente `localhost`. |
| `DB_NAME` | Nome del database, ad esempio `mini_biblioteca`. |
| `DB_PASSWORD` | Password dell'utente PostgreSQL, da tenere solo nel file locale. |
| `DB_PORT` | Porta PostgreSQL, normalmente `5432`. |
| `PORT` | Porta backend, `3000`. |
| `FRONTEND_URL` | Origine consentita da CORS, `http://localhost:5173`. |

Il frontend attuale chiama `http://localhost:3000`: mantenere questa porta per il backend. `.env`, dipendenze e risultati delle build sono esclusi da Git.

## Database

Creare un database PostgreSQL vuoto e applicare lo script dalla root, sostituendo `UTENTE_LOCALE` con il proprio utente:

```sh
createdb -U UTENTE_LOCALE mini_biblioteca
psql -U UTENTE_LOCALE -d mini_biblioteca -f sql/database.sql
```

Lo script crea `libri` e `prestiti` e inserisce otto libri di esempio. Eseguire il popolamento una sola volta: gli INSERT ripetuti aggiungono altre righe. Si può eseguire lo stesso script tramite un client PostgreSQL sul database scelto.

## Installazione e avvio

Dalla root, installare e compilare il backend:

```sh
npm ci
npx tsc
node dist/index.js
```

In un altro terminale, avviare il frontend:

```sh
cd frontend
npm ci
npm run dev
```

Aprire l'indirizzo mostrato da Vite, normalmente `http://localhost:5173`. Per compilare il frontend:

```sh
cd frontend
npm run build
```

## Test

Dalla root:

```sh
npm test
```

I test sono in `src/tests/` e richiedono PostgreSQL raggiungibile e almeno un libro disponibile. Usare un database dedicato ai test, inizializzato con `sql/database.sql`, impostando le variabili `DB_*` per quel database. Il test del prestito crea dati e registra una restituzione: non eseguirlo su un database con dati da conservare. I test non creano né ripuliscono automaticamente il database.

Questa pubblicazione riunisce frontend e backend già esistenti e conserva la cronologia Git precedente. Non introduce modifiche alla logica applicativa o allo schema SQL.
