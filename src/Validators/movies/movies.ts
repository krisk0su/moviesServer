import express from "express";
import { validateBody } from "../../lib/bodyValidator";

const fileName = "movies";

export const createMovieValidator = (req: express.Request) => {
    validateBody(fileName, "IMovieValidator", req);
}

export const getMoviesValidator = (req: express.Request) => {
    const {searchTerm, genres, page, imdbRating, year} = req.body;

}