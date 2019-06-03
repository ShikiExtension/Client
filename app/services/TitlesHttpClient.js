class TitlesHttpClient {
    /**
     * @return {TitlesHttpClient}
     */
    static getInstance() {
        return new TitlesHttpClient();
    }

    /**
     * @param {number} titleId
     * @return {FetchWrapper}
     */
    getEpisodes(titleId) {
        return App.get('http')
            .resolveUrlByConfig('api-urls.titles.getEpisodes', {titleId})
            .get();
    }

    /**
     * @param {number} titleId
     * @param {number} episode
     * @return {FetchWrapper}
     */
    getVideosByEpisode(titleId, episode) {
        return App.get('http')
            .resolveUrlByConfig('api-urls.titles.getVideosByEpisode', {titleId, episode})
            .get();
    }
}