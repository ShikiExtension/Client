Application.registerProvider(function (loader) {
    loader.setConfig('api-urls', {
        remoteServer: {
            protocol: 'http',
            host: '77.222.63.199',
            port: '80',
        },
        titles: {
            getEpisodes: '/title/:titleId/videos/episodes',
            getVideosByEpisode: '/title/:titleId/videos/episode/:episode'
        }
    });
});