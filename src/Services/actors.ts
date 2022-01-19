import { actorModel } from "../Models/actors/actors";

export const createActors = async (actors: string[]) => {
    const savedActors: any = [];
    for (const actor of actors) {
        const keys = actor.split(" ");
        const firstName = keys[0];
        const lastName = keys[1];

        try {
            const newActor: any = new actorModel({firstName, lastName});
            const result = await newActor.save();
            savedActors.push(result._id);
        } catch (err) {
            const actor = await actorModel.findOne({firstName, lastName});
            savedActors.push(actor);
        }
    }
    return savedActors;
}