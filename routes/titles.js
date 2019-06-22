Application.registerProvider(() => {
    const Router = Application.get('Router');

    Router.createRoute('/animes/*', 'TitlesController@title').name('title');
    Router.createRoute('/animes/:url#/watch-online/:episode', 'TitlesController@watchOnline')
        .name('title.watch-online');
});