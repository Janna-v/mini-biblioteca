import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("GET /api/libri", () => {
    it("deve restituire la lista dei libri", async () => {
        const response = await request(app)
            .get("/api/libri");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});