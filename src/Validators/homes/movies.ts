import express from "express";
import { validateBody } from "../../lib/bodyValidator";
import { Errors } from "typescript-rest";

const fileName = "movies";

export const createValidator = (req: express.Request) => {
    validateBody(fileName, "IMovieValidator", req);
}

export const getMoviesValidator = (req: express.Request) => {
    const {searchTerm, genres, page, imdbRating, year} = req.body;
    if (!page) throw new Errors.BadRequestError()

    if (searchTerm != null  && searchTerm === "") {
        throw new Errors.BadRequestError();
    }

    if (genres != null  && genres === "") {
        throw new Errors.BadRequestError();
    }

    if (imdbRating != null && imdbRating == 0) {
        throw new Errors.BadRequestError();
    }

    if (year != null && year <= 1980) {
        throw new Errors.BadRequestError();
    }
}