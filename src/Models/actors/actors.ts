import { Schema, model } from 'mongoose';
import { IActorDocument } from "../../Interfaces/actors";

const actors: Schema<IActorDocument> = new Schema<IActorDocument>({
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
});

actors.index({firstName: 'text', lastName: 'text'}, {unique: true});


export const actorModel = model<IActorDocument>('Actors', actors);

