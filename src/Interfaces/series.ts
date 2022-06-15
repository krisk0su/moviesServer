import { IEntityValidator } from "./common";

export interface ISeriesDocument extends ISeries, Document {

}

export interface ISeries extends IEntityValidator{
    episodes: any[],
    likes: any[]
}

