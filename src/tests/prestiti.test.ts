import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("API Prestiti", () => {

    it("deve rifiutare dati non validi", async () => {
        const response = await request(app)
            .post("/api/prestiti")
            .send({
                libro_id: -1,
                nome_utente: ""
            });

        expect(response.status).toBe(400);
        expect(response.body.messaggio).toBe("Dati non validi");
    });

    it("deve creare e poi restituire un prestito", async () => {
        const libriResponse = await request(app)
            .get("/api/libri?disponibile=true");

        const libro = libriResponse.body[0];

        expect(libro).toBeDefined();

        const prestitoResponse = await request(app)
            .post("/api/prestiti")
            .send({
                libro_id: libro.id,
                nome_utente: "Test Automatico"
            });

        expect(prestitoResponse.status).toBe(201);
        expect(prestitoResponse.body.messaggio).toBe(
            "Prestito creato"
        );

        const doppioPrestitoResponse = await request(app)
            .post("/api/prestiti")
            .send({
                libro_id: libro.id,
                nome_utente: "Test Automatico"
            });

        expect(doppioPrestitoResponse.status).toBe(400);
        expect(doppioPrestitoResponse.body.messaggio).toBe(
            "Prestito non disponibile"
        );

        const restituzioneResponse = await request(app)
            .post("/api/prestiti/restituzione")
            .send({
                libro_id: libro.id
            });

        expect(restituzioneResponse.status).toBe(200);
        expect(restituzioneResponse.body.messaggio).toBe(
            "Libro restituito"
        );
    });

});