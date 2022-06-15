import { Context, Path, POST, PreProcessor, ServiceContext } from "typescript-rest";
import { jwtValidAdmin } from "../Validators/jwt/jwt";
import { IEntityValidator } from "../Interfaces/common";
import { addEpisode, createSerie } from "../Services/series";
import { createSeriesValidator } from "../Validators/series/series";
import { IEpisode } from "../Interfaces/episodes";

@Path('series')
export class Series {
    @Context
    context: ServiceContext;

    @POST
    @PreProcessor(createSeriesValidator)
    // @PreProcessor(jwtValidAdmin)
    async createSeries(serie: IEntityValidator) {
        const res = await createSerie(serie);

        return res;
    }

    @POST
    @Path("/addEpisode")
    async addEpisode(episode: IEpisode){
        const res = await addEpisode(episode)
        return res;
    }
}