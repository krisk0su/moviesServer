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
import { createMovieValidator, getMoviesValidator } from "../Validators/movies/movies";
import { createMovie, editMovie, getMovie, getMovies, likeMovie, addEpisode } from "../Services/movies";
import { IEditMovieValidator, IGetMovies, IMovieValidator } from "../Interfaces/movies";
import { jwtValidAdmin, jwtValidator } from "../Validators/jwt/jwt";
import { IEntityValidator } from "../Interfaces/common";
import { IEpisode } from "../Interfaces/episodes";


@Path('movies')
export class Movies {
    @Context
    context: ServiceContext;

    @GET
    @Path("/:id")
    async getMovieById(@PathParam('id') id: string) {
        const movie = await getMovie(id);

        return movie;
    }

    @POST
    @Path("/getMovies")
    // @PreProcessor(getMoviesValidator)
    async getMovies(criteria: IGetMovies) {
        const movies = await getMovies(criteria)
        return movies;
    }

    @POST
    @PreProcessor(createMovieValidator)
    // @PreProcessor(jwtValidAdmin)
    async createMovie(movie: IMovieValidator) {
         const res = await createMovie(movie);

        //TODO redirect to movies
        return "Movie created"
    }

    @PUT
    @PreProcessor(jwtValidAdmin)
    async editMovie(movie: IEditMovieValidator) {
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

    @POST
    @Path("/addEpisode")
    async addEpisode(episode: IEpisode) {
        const res = await addEpisode(episode)
        return res;
    }
}