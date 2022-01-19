import {
    Context,
    GET,
    Path,
    PathParam,
    POST,
    PreProcessor,
    PUT,
    ServiceContext
} from "typescript-rest";
import { createValidator, getMoviesValidator } from "../Validators/homes/movies";
import { createMovie, editMovie, getMovie, getMovies, likeMovie } from "../Services/movies";
import { IEditMovieValidator, IGetMovies, IMovieValidator } from "../Interfaces/movies";
import { jwtValidator } from "../Validators/jwt/jwt";


@Path('movies')
export class Movies {
    @Context
    context: ServiceContext;

    @GET
    @Path("/:id")
    async getMovieById(@PathParam('id') id: string) {
        const movie =  await getMovie(id);

        return movie;
    }

    @POST
    @Path("/getMovies")
    @PreProcessor(getMoviesValidator)
    async getMovies(criteria: IGetMovies) {
        const movies = await getMovies(criteria)
        return movies;
    }

    @POST
    @PreProcessor(createValidator)
    async createMovie(movie: IMovieValidator) {
        const res = await createMovie(movie);

        //TODO redirect to movies
        return "Movie created"
    }

    @PUT
    async editMovie(movie: IEditMovieValidator){
        const id: String = await editMovie(movie);
        return this.getMovieById(`${id}`);
    }

    @PUT
    @Path("/like/:id")
    @PreProcessor(jwtValidator)
    async likeMovie(@PathParam('id') id: string) {
        await likeMovie(id, this.context.request.headers.authorization);
        return "as";
    }
}