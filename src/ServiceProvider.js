class ServiceProvider {
    /**
     * @param {ApplicationLoader} loader
     * @static
     */
    static provide(loader) {
        Application.make('NavigationObserver').register();

        const router = Application.make('Router');
        Application.singleton('Router', router);
    }
}