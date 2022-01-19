import { Schema, model } from 'mongoose';
import { IGenreDocument } from "../../Interfaces/genre";

const genres: Schema<IGenreDocument> = new Schema<IGenreDocument>({
    name: {type: String, required: true, unique: true}
});

genres.index({name: 'text'});

export const genresModel = model<IGenreDocument>('Genres', genres);