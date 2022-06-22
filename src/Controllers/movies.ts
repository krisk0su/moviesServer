import {
    Context,
    GET,
    Path,
    PathParam,
    POST,
    PreProcessor,
    PUT,
    QueryParam,
    ServiceContext
} from "typescript-rest";
import { createMovieValidator } from "../Validators/movies/movies";
import {
    createMovie,
    editMovie,
    getMovie,
    getMovies,
    likeMovie,
    addEpisode,
    getEpisodes,

} from "../Services/movies";
import { IEditMovieValidator, IGetMovies, IMovieValidator } from "../Interfaces/movies";
import { jwtValidAdmin, jwtValidator } from "../Validators/jwt/jwt";
import { IEpisode } from "../Interfaces/episodes";


@Path('movies')
export class Movies {
    @Context
    context: ServiceContext;

    @GET
    @Path("/movie/:id")
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
    @PreProcessor(jwtValidAdmin)
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
        return this.context.response.sendStatus(200);
    }

    @POST
    @Path("/addEpisode")
    @PreProcessor(jwtValidator)
    @PreProcessor(jwtValidAdmin)
    async addEpisode(episode: IEpisode) {
        const res = await addEpisode(episode)
        return "add";
    }

    @GET
    @Path("/getEpisodes")
    async getEpisodes(@QueryParam('seriesId') seriesId: string,
                      @QueryParam('season') season: string) {
        return await getEpisodes(seriesId, season);
    }
}