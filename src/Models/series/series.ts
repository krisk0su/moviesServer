import { ISeriesDocument } from "../../Interfaces/series";
import { model, Schema, Types } from "mongoose";

const series: Schema<ISeriesDocument> = new Schema<ISeriesDocument>({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    trailer: {type: String, required: true},
    year: {type: Number, required: true},
    imdbRating: {type: Number, required: true},
    actors: [{type: Types.ObjectId, ref: 'Actors', required: true}],
    likes: [{type: Types.ObjectId, ref: 'Users', required: true, default: []}],
    genres: [{type: Types.ObjectId, ref: 'Genres', required: true}],
    episodes:  [{type: Types.ObjectId, ref: 'Episodes', required: true}]
});

series.index({name: "text"});

export const seriesModel = model<ISeriesDocument>('Series', series);