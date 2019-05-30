class ServiceProvider {
    /**
     * @param {ApplicationLoader} loader
     * @static
     */
    static provide(loader) {
        Application.make('NavigationObserver').register();

        Application.singleton('Router');
    }
}