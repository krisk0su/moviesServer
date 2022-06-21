import { IEditMovieValidator, IGetMovies, IMovieDocument, IMovieValidator } from "../Interfaces/movies";
import { movieModel } from "../Models/movies/movies";
import { createActors } from "./actors";
import { verifyJwt } from "../lib/jwtService";
import { Errors } from "typescript-rest";
import { createGenres } from "./genres";
import { IEntityValidator } from "../Interfaces/common";
import { MovieType } from "../Enums/movies";
import { IEpisode } from "../Interfaces/episodes";
import { episodeModel } from "../Models/series/episodes";
import { isValidObjectId } from "mongoose";


export const createMovie = async (movie: IMovieValidator) => {
    const actors = await createActors(movie.actors);
    const genres = await createGenres(movie.genres);
    const type = getType(movie.type);
    const newMovie: any = new movieModel(
        {
            ...movie,
            actors,
            genres,
            type
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
    await movieModel.updateOne({id}, movie);
    return id;
};

export const getMovies = async (criteria: IGetMovies) => {
    const {searchTerm, genres, imdbRating, year, page = 1} = criteria;
    let movies: any;
    const type = criteria.type ? getType(criteria.type) : null;

    const limit = 10;
    const skip: number = (page - 1) * limit;

    let filter: any = {};

    if (searchTerm) {
        filter.name = {$regex: searchTerm, $options: 'i'}
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

    if (type) {
        filter.type = {$eq: type};
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

const getType = (type: string) => {
    switch (type.toUpperCase()) {
        case MovieType.MOVIE:
            return MovieType.MOVIE;
        case MovieType.SERIE:
            return MovieType.SERIE;
        case MovieType.ANIME:
            return MovieType.ANIME;
        default:
            throw new Errors.BadRequestError(`${type} is not valid movie type.`)
    }
}

export const addEpisode = async (episode: IEpisode) => {
    const {seriesId} = episode;
    try {
        const type = await checkIfSeriesIdExists(seriesId);
        const newEpisode = new episodeModel({...episode, type});
        const result = await newEpisode.save();
        return result._id;
    } catch (err) {
        throw new Errors.BadRequestError(err.message)
    }
}

const checkIfSeriesIdExists = async (id: any) => {
    const isObjectIdValid = isValidObjectId(id);
    if (!isObjectIdValid) {
        throw new Errors.BadRequestError("The seriesId is not valid.");
    }
    const serie: IMovieDocument = await movieModel.findOne({_id: id});
    if (!serie) {
        throw new Errors.BadRequestError("The seriesId does not exist in the database");
    }
    const type = serie.type;
    if (type === MovieType.MOVIE) {
        throw new Errors.BadRequestError(`The seriesId is of type ${MovieType.MOVIE} but it has to be ${MovieType.SERIE} or ${MovieType.ANIME}`);
    }
    return type;
}