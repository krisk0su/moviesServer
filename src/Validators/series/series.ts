import express from "express";
import { validateBody } from "../../lib/bodyValidator";

const fileName = "common";

export const createSeriesValidator = (req: express.Request) => {
    validateBody(fileName, "IEntityValidator", req);
}