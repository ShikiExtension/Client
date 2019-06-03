class TitlesController {
    /**
     * @constructor
     */
    constructor(){
        this.httpClient = TitlesHttpClient.getInstance();
    }

    /**
     * @param {string} url
     */
    title(url) {
        const titleId = url.split('-', 2).shift();
        if (!titleId)
            throw new NotFoundHttpException();

        console.log({url, titleId});

        this.httpClient.getEpisodes(+titleId).then(console.log);
    }
}