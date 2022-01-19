import { genresModel } from "../Models/genres/genres";

export const createGenres = async (genresArr: string[]) => {
    const genres = [];
    for (const genre of genresArr) {
        try {
            const newGenre = new genresModel({name: genre});
            await newGenre.save();
            genres.push(newGenre._id)
        } catch (err) {
            //if the genre exists get it from the database
            const dbGenre: any = await genresModel
                .findOne({name: genre})
            genres.push(dbGenre._id);
        }
    }
    return genres;
}