import { Schema, model, Types } from 'mongoose';
import { IEpisodeDocument } from "../../Interfaces/episodes";

const episodes: Schema<IEpisodeDocument> = new Schema<IEpisodeDocument>({
    seriesId:  {type: Types.ObjectId, ref: 'Series', required: true},
    season: {type: Number, required: true},
    title: {type: String, required: true},
    watchLinks: {type: [], required: true, default: []}
})

episodes.index({ season: 1, title: 1 }, { unique: true });

export const episodeModel = model<IEpisodeDocument>('Episodes', episodes);