import { IEditMovieValidator, IGetMovies, IMovieValidator } from "../Interfaces/movies";
import { movieModel } from "../Models/movies/movies";
import { createActors } from "./actors";
import { verifyJwt } from "../lib/jwtService";
import { Errors } from "typescript-rest";
import { createGenres } from "./genres";


export const createMovie = async (home: IMovieValidator) => {
    const actors = await createActors(home.actors);
    const genres = await createGenres(home.genres);
    const newMovie: any = new movieModel(
        {
            ...home,
            actors,
            genres
        }
    );
    try {
        const result = await newMovie.save();
        return result._id;
    } catch (err) {
        throw new Errors.BadRequestError("This movies already exists.")
    }
}

export const editMovie = async (movie: IEditMovieValidator) => {
    const {id} = movie;
    await movieModel.updateOne({id}, movie );
    return id;
};

export const getMovies = async (criteria: IGetMovies) => {
    const {searchTerm, genres, imdbRating, year, page} = criteria;
    let movies: any;

    const limit = 10;
    const skip: number = (page - 1) * limit;

    let filter: any = {};

    if (searchTerm) {
        filter.$text = {$search: searchTerm}
    }

    if (genres) {
        filter.genres = {$in: genres};
    }

    if (imdbRating) {
        filter.imdbRating = {$gte: imdbRating};
    }

    if (year) {
        filter.year = year;
    }
    movies = await movieModel
        .find(filter)
        .skip(skip)
        .limit(limit);

    return movies;
}

export const likeMovie = async (movieId: string, token: string) => {
    const {userId} = verifyJwt(token).payload;
    try {
        await movieModel.updateOne({_id: movieId},
            {$addToSet: {likes: userId}});
    } catch (err: any) {
        throw new Errors.BadRequestError("You already have liked this movies.")
    }
}

export const getMovie = async (movieId: string) => {
    const movie = await movieModel.findOne({id: movieId});
    return movie;
}