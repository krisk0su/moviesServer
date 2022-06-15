import { IEntityValidator } from "../Interfaces/common";
import { createActors } from "./actors";
import { createGenres } from "./genres";
import { seriesModel } from "../Models/series/series";
import { Errors } from "typescript-rest";
import { IEpisode } from "../Interfaces/episodes";
import { episodeModel } from "../Models/series/episodes";
import {isValidObjectId} from "mongoose";

export const createSerie = async (serie: IEntityValidator) => {
    const actors = await createActors(serie.actors);
    const genres = await createGenres(serie.genres);
    const newSerie = new seriesModel(
        {
            ...serie,
            actors,
            genres
        }
    )
    try {
        const result = await newSerie.save();
        return result._id;
    } catch (err) {
        throw new Errors.BadRequestError("This serie already exists.")
    }
}

export const addEpisode = async (episode: IEpisode) => {
    const {seriesId} = episode;

    const newEpisode = new episodeModel(episode);
    await checkIfSeriesIdExists(seriesId);
    try {
        const result = await newEpisode.save();
        return result._id;
    } catch (err) {
        throw new Errors.BadRequestError(err)
    }
}

const checkIfSeriesIdExists = async (id: any) => {
    const isObjectIdValid = isValidObjectId(id);
    if(!isObjectIdValid){
        throw new Errors.BadRequestError("The seriesId is not valid.");
    }
    const doesSeriesExists = await seriesModel.exists({_id: id});
    if (!doesSeriesExists) {
        throw new Errors.BadRequestError("The seriesId does not exist in the database");
    }
}