export interface IEpisodeDocument extends IEpisode, Document {

}

export interface IEpisode {
    seriesId: any,
    season: number,
    title: string,
    watchLinks: any[]

}
