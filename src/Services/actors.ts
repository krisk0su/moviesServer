import { actorModel } from "../Models/actors/actors";

export const createActors = async (actors: string[]) => {
    const savedActors: any = [];
    for (const actor of actors) {
        const name = actor.trim();
        try {
            const newActor: any = new actorModel({name});
            const result = await newActor.save();
            savedActors.push(result._id);
        } catch (err) {
            const actor = await actorModel.findOne({name});
            savedActors.push(actor);
        }
    }
    return savedActors;
}