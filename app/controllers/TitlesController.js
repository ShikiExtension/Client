class TitlesController {
    /**
     * @constructor
     */
    constructor() {
        this.httpClient = TitlesHttpClient.getInstance();
    }

    /**
     * @param {string} url
     */
    title(url) {
        const titleId = url.split('-', 2).shift();
        if (!titleId)
            throw new NotFoundHttpException();

        this.httpClient.getEpisodes(+titleId).json().then(res => {
            const episodes = res['episodes'];
            const hasVideos = episodes.length > 0;

            const buttonContainer = this.getWatchOnlineButtonContainer();
            const route = App.get('Router').getRouteByName('title.watch-online');
            if (!route)
                throw new Error('Route not found');

            let episode = (buttonContainer.dataset.episodes_aired || 0) + 1;
            episode = Math.min(episode, Math.max(...episodes));

            const block = document.createElement('div');
            block.className = 'block';

            const button = document.createElement('a');
            button.className = 'b-link_button dark ' + (hasVideos ? 'watch-online' : 'upload-video');
            button.textContent = hasVideos ? 'Смотреть онлайн' : 'Нет видео';
            if (hasVideos)
                button.href = route.compile({url, episode});

            block.appendChild(button);
            buttonContainer.appendChild(block);
        });
    }

    /**
     * @param {Object} params
     */
    watchOnline(params) {
        const titleId = params.url.split('-', 2).shift();
        const episode = params.episode;

        this.httpClient.getVideosByEpisode(titleId, episode).json().then(res => {
            console.log('Episode: ', episode);
            console.log(res['items']);
        });
    }

    /**
     * @return {Element}
     */
    getWatchOnlineButtonContainer() {
        const watchOnlineButtonContainer = document.querySelector('.watch-online-placeholer');
        if (!watchOnlineButtonContainer)
            throw new Error('Container not found');

        return watchOnlineButtonContainer;
    }
}