Application.registerProvider(function (loader) {
    loader.setConfig('api-urls', {
        remoteServer: {
            protocol: 'https',
            host: 'shiki-extension.com',
            port: '443',
        },
        titles: {
            getEpisodes: '/title/:titleId/videos/episodes',
            getVideosByEpisode: '/title/:titleId/videos/episode/:episode'
        }
    });
});