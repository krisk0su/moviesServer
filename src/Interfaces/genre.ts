export interface IGenreDocument extends IGenre, Document {

}

export interface IGenre {
    _id: string;
    name: string;
}