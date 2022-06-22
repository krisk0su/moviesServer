import { createMovie } from "../Services/movies";

const mocks = [
    {
        "name": "Thor",
        "type": "movie",
        "description": "Thor",
        "trailer": "NOPE",
        "year": 2011,
        "actors": ["Chris Hemsworth", "Natalie Portman", "Tom Hiddleston"],
        "imdbRating": 7,
        "genres": ["Action","Adventure","Fantasy", "Marvel"]
    },
    {
        "name": "Spider-Man: No Way Home",
        "type": "movie",
        "description": "Spider-Man: No Way Home",
        "trailer": "NOPE",
        "year": 2011,
        "actors": ["Tom Holland", "Zendaya", "Jacob Batalon", "Marvel"],
        "imdbRating": 8.3,
        "genres": ["Action","Adventure","Fantasy","Sci-Fi", "Marvel"]
    },
    {
        "name": "Iron Man",
        "type": "movie",
        "description": "Iron Man",
        "trailer": "NOPE",
        "year": 2008,
        "actors": ["Robert Downey Jr.", "Terrence Howard", "Jeff Bridges"],
        "imdbRating": 8.3,
        "genres": ["Action","Adventure","Fantasy","Sci-Fi", "Marvel"]
    },
    {
        "name": "Deadpool",
        "type": "movie",
        "description": "Deadpool",
        "trailer": "NOPE",
        "year": 2016,
        "actors": ["Ryan Reynolds", "Karan Soni", "Chris Hemsworth"],
        "imdbRating": 8.0,
        "genres": ["Action","Adventure","Fantasy","Sci-Fi", "Comedy"]
    },
    {
        "name": "Deadpool 2",
        "type": "movie",
        "description": "Deadpool 2",
        "trailer": "NOPE",
        "year": 2018,
        "actors": ["Ryan Reynolds", "Karan Soni", "Morena Baccarin"],
        "imdbRating": 7.7,
        "genres": ["Action","Adventure","Fantasy","Sci-Fi", "Comedy"]
    },
    {
        "name": "Deadpool 3",
        "type": "movie",
        "description": "Deadpool 3",
        "trailer": "NOPE",
        "year": 2020,
        "actors": ["Ryan Reynolds", "Karan Soni", "Morena Baccarin"],
        "imdbRating": 7.7,
        "genres": ["Action","Adventure","Fantasy","Sci-Fi", "Comedy"]
    },
    {
        "name": "Vikings",
        "type": "serie",
        "description": "Vikings",
        "trailer": "NOPE",
        "year": 2013,
        "actors": ["Katheryn Winnick", "Gustaf Skarsgård", "Alexander Ludwig"],
        "imdbRating": 8.5,
        "genres": ["Action","Adventure"," Drama","History", "War"]
    },
    {
        "name": "Game of Thrones",
        "type": "serie",
        "description": "Game of Thrones",
        "trailer": "NOPE",
        "year": 2015,
        "actors": ["Peter Dinklage", "Lena Headey", "Emilia Clarke"],
        "imdbRating": 9,
        "genres": ["Action","Adventure"," Fantasy"]
    },
    {
        "name": "One piece",
        "type": "anime",
        "description": "One piece",
        "trailer": "NOPE",
        "year": 2000,
        "actors": [],
        "imdbRating": 10,
        "genres": ["Action","Adventure"," Fantasy"]
    },
    {
        "name": "The Seven Deadly Sins",
        "type": "anime",
        "description": "One piece",
        "trailer": "NOPE",
        "year": 2000,
        "actors": [],
        "imdbRating": 10,
        "genres": ["Action","Adventure","Love"]
    },

]

export const seedMovies = async () => {
    await mocks.forEach(async (mock: any) => {
        await createMovie(mock);
    })
}