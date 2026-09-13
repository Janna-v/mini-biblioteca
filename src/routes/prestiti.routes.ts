import { Router } from "express";

import {
    creaPrestito,
    restituisciPrestito
} from "../controllers/prestiti.controller.js";

import { validateBody } from "../middlewares/validate.middleware.js";

import {
    creaPrestitoSchema,
    restituzioneSchema
} from "../schemas/prestiti.schema.js";

const router = Router();

router.post(
    "/",
    validateBody(creaPrestitoSchema),
    creaPrestito
);

router.post(
    "/restituzione",
    validateBody(restituzioneSchema),
    restituisciPrestito
);

export default router;