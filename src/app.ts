import express from "express";
import cors from "cors";
import "dotenv/config";

import libriRouter from "./routes/libri.routes.js";
import prestitiRouter from "./routes/prestiti.routes.js";

import { requestLoggerMW } from "./middlewares/request-logger.middleware.js";
import { errorMW } from "./middlewares/error.middleware.js";

export const app = express();

const FRONTEND_URL =
    process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
    cors({
        origin: FRONTEND_URL
    })
);

app.use(express.json());
app.use(requestLoggerMW);

app.use("/api/libri", libriRouter);
app.use("/api/prestiti", prestitiRouter);

app.use(errorMW);