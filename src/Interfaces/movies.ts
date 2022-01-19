export interface IMovieDocument extends IMovie,Document {

}

export interface IMovie extends IMovieValidator{
    watchLinks: any[];
    comments: any[];
    likes: any[];
};

export interface IMovieValidator {
    name: string;
    description: string;
    trailer: string;
    year: number;
    actors: any[];
    imdbRating: number;
    genres: any[];
};

export interface IGetMovies{
    searchTerm: string;
    genres: string;
    imdbRating: number;
    page: number;
    year: number;
}



