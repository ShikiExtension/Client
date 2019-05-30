class Router {
    constructor() {
        this.routes = [];
        this.fallback = null;
    }

    /**
     * @param {Route} route
     * @return {Router}
     */
    addRoute(route) {
        this.routes.push(route);

        return this;
    }

    /**
     * @param {string|function} callable
     * @return {Router}
     */
    registerFallback(callable) {
        this.fallback = Application.make('Route', callable);

        return this;
    }

    /**
     * @param {string} url
     * @param {string|function} handler
     *
     * @return {Route}
     */
    createRoute(url, handler) {
        const route = Application.make('Route', handler).url(url);
        this.addRoute(route);

        return route;
    }

    /**
     * @return {Promise<*>}
     */
    dispatch() {
        const requestUrl = window.top.location.pathname;
        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i];
            if (route.matches(requestUrl))
                return Promise.resolve(
                    route.callHandler()
                );
        }

        const error = new Error('Not found');
        const result = Promise.reject(error);

        if (this.fallback)
            return result.catch(this.fallback);

        return result;
    }
}