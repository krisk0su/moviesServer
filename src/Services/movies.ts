import { IGetMovies, IMovieValidator } from "../Interfaces/movies";
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

export const getMovies = async (criteria: IGetMovies) => {
    const {searchTerm, genres, imdbRating, year, page} = criteria;
    let movies: any;

    const limit = 10;
    const skip: number = (page - 1) * limit;

    if (searchTerm) {
        movies = await movieModel
            .find(
                {
                    $text: {$search: searchTerm}
                },
            )
            .skip(skip)
            .limit(limit);

    }

    if (genres) {
        movies = await movieModel
            .find({genres: {$in: genres}})
            .skip(skip)
            .limit(limit);
    }

    if (imdbRating) {
        movies = await movieModel
            .find({imdbRating: {$gte: imdbRating}})
            .skip(skip)
            .limit(limit);
    }

    if (year) {
        movies = await movieModel
            .find({year: year})
            .skip(skip)
            .limit(limit);
    }
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