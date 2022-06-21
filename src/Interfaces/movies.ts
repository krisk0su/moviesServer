import { IEntityValidator } from "./common";

export interface IMovieDocument extends IMovie, Document {

}

export interface IMovie extends IMovieValidator {
    watchLinks: any[];
    comments: any[];
    likes: any[];
    episodes: any[];
};

export interface IEditMovieValidator {
    id: string;
    name: string;
    description: string;
    year: number;
    trailer: string;
};

export interface IMovieValidator {
    name: string;
    type: string;
    description: string;
    trailer: string;
    year: number;
    actors: any[];
    genres: any[];
    imdbRating: number;
};

export interface IGetMovies {
    searchTerm: string;
    genres: string;
    imdbRating: number;
    page: number;
    year: number;
    type: string;
}



