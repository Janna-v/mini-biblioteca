# Mini Biblioteca

Frontend per consultare un catalogo di libri, richiedere un prestito e registrare una restituzione.

**Progetto individuale.** Esercitazione sull'interfaccia React, sullo stato condiviso e sulle richieste HTTP.

## Funzionalità

- Visualizzazione di titolo, autore, anno e disponibilità dei libri.
- Inserimento del nome dell'utente per la richiesta di prestito.
- Richiesta di prestito e restituzione tramite API.
- Aggiornamento dello stato di disponibilità nel frontend.
- Gestione del caricamento e degli errori del catalogo.

## Tecnologie e struttura

React, TypeScript, Vite, Zustand, Fetch API e Bootstrap.

- `src/components/`: catalogo, scheda del libro e nome utente.
- `src/pages/BibliotecaPage.tsx`: pagina della biblioteca.
- `src/stores/biblioteca.ts`: stato Zustand e richieste al backend.
- `src/types/Libro.ts`: tipo dei dati del libro.

## Avvio

Con Node.js compatibile con Vite 8 e npm, dalla radice del repository:

```powershell
npm ci
npm run dev
```

Aprire l'indirizzo indicato da Vite nel terminale. Sono disponibili anche `npm run build` e `npm run lint`.

## Backend necessario

Il backend **non è incluso in questo repository**. Per utilizzare catalogo e prestiti serve un servizio compatibile su `http://localhost:3000`, con CORS configurato per il frontend.

| Metodo | Percorso | Dati inviati |
| --- | --- | --- |
| GET | `/api/libri` | Nessuno; il frontend si aspetta un elenco di libri |
| POST | `/api/prestiti` | `libro_id`, `nome_utente` |
| POST | `/api/prestiti/restituzione` | `libro_id` |

Senza questo servizio l'interfaccia non può completare le operazioni. Non sono fornite istruzioni di installazione del backend, perché il suo codice non è disponibile qui. L'avvio del frontend e l'integrazione non sono stati eseguiti durante la revisione documentale.
