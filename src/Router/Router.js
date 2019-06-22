class Router {
    constructor() {
        this.routes = [];
        this.fallback = null;
        this.currentRoute = null;
    }

    /**
     * @param {string} name
     * @return {Route|null}
     */
    getRouteByName(name) {
        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i];
            if (route.getName() === name)
                return route;
        }

        return null;
    }

    /**
     * @return {Route|null}
     */
    getCurrentRoute() {
        return this.currentRoute;
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
        const location = window.top.location;
        const requestUrl = location.href.split(location.hostname).pop();

        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i];
            if (route.matches(requestUrl)) {
                this.currentRoute = route;

                return Promise.resolve(
                    route.callHandler()
                );
            }
        }

        const error = new Error('Not found');
        const result = Promise.reject(error);

        if (this.fallback)
            return result.catch(this.fallback);

        return result;
    }
}