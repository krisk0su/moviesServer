import { Schema, model } from 'mongoose';
import { IActorDocument } from "../../Interfaces/actors";

const actors: Schema<IActorDocument> = new Schema<IActorDocument>({
    name: {
        type: String, required: true, index: {
            unique: true,
            collation: {locale: 'en', strength: 2}
        }
    }
});

export const actorModel = model<IActorDocument>('Actors', actors);

