class ServiceProvider {
    /**
     * @param {ApplicationLoader} loader
     */
    static provide (loader) {
        const observer = new NavigationObserver();
        loader.registerService('NavigationObserver', observer);

        observer.register();
    }
}