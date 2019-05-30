Application.registerProvider(() => {
    const Router = Application.get('Router');
    
    Router.createRoute('/animes/*', 'TitlesController@title');
});