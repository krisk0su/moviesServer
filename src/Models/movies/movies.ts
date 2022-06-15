import { Schema, model, Types } from 'mongoose';
import { IMovieDocument } from "../../Interfaces/movies";

const movies: Schema<IMovieDocument> = new Schema<IMovieDocument>({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    trailer: {type: String, required: true},
    year: {type: Number, required: true},
    watchLinks: {type: [], required: true, default: []},
    imdbRating: {type: Number, required: true},
    actors: [{type: Types.ObjectId, ref: 'Actors', required: true}],
    likes: [{type: Types.ObjectId, ref: 'Users', required: true}],
    genres: [{type: Types.ObjectId, ref: 'Genres', required: true}]
})

movies.index({name: "text"});

export const movieModel = model<IMovieDocument>('Movies', movies);

