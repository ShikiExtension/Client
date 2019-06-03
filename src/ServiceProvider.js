class ServiceProvider {
    /**
     * @param {ApplicationLoader} loader
     * @static
     */
    static provide(loader) {
        Application.make('NavigationObserver').register();

        Application.singleton('http', () => {
            const client = new HttpClientService();
            client.appendHeader('X-Authorization', 'browser-extension');

            return client;
        });

        Application.singleton('Router');
    }
}