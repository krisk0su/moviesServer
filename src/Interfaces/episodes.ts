export interface IEpisodeDocument extends IEpisode, Document {

}

export interface IEpisode {
    seriesId: any,
    season: string,
    title: string,
    watchLinks: any[],
    type: string
}
