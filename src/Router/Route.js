class Route {
    /**
     * @param {function|string} handler
     * @constructor
     */
    constructor(handler) {
        this.__handler = handler;
        this.__name = null;
        this.__url = null;
        this.__defaultParams = null;
        this.__params = null;
    }

    /**
     * @return {string|undefined}
     */
    getName() {
        return this.__name;
    }

    /**
     * @param {string} name
     *
     * @return {Route}
     */
    name(name) {
        this.__name = name;

        return this;
    }

    /**
     * @param {string} url
     *
     * @return {Route}
     */
    url(url) {
        this.__url = url;

        return this;
    }

    /**
     * @param {Array|object} params
     *
     * @return {Route}
     */
    defaults(params) {
        this.__defaultParams = params;

        return this;
    }

    /**
     * @param {string} requestUrl
     * @return {boolean}
     */
    matches(requestUrl) {
        const urlToArray = url => url.split('/').filter(part => part.trim().length);

        let hasNamedParams = false;
        const params = [];
        const defaultParams = this.__defaultParams || {};

        const request = urlToArray(requestUrl);
        const route = urlToArray(this.__url);

        for (let i = 0; i < route.length; i++) {
            const routePart = route[i];
            const requestPart = i in request ? request[i] : undefined;
            const isAsterisk = routePart.charAt(0) === '*';
            const isVariable = isAsterisk || routePart.charAt(0) === ':';
            const isRequire = !isVariable || routePart.charAt(routePart.length - 1) !== '?';

            if (!isVariable) {
                if (routePart !== requestPart)
                    return false;

                continue;
            }

            const param = {
                name: isAsterisk ?
                    params.length :
                    routePart.substr(1, isRequire ? routePart.length - 1 : undefined),
                value: requestPart
            };

            if (!param.value && param.name in defaultParams)
                param.value = defaultParams[param.name];

            if (isRequire && !param.value)
                return false;

            params.push(param);

            hasNamedParams = hasNamedParams || isVariable && !isAsterisk;
        }

        if (route.length in request)
            return false;

        this.__params = hasNamedParams ? {} : [];
        params.forEach(param => {
            this.__params[param.name] = param.value;
        });

        return true;
    }

    /**
     * @return {Array|object|undefined}
     */
    getParameters() {
        return this.__params;
    }

    /**
     * @param {string} name
     *
     * @return {Array|object|undefined}
     */
    getParameter(name) {
        return this.__params && name in this.__params ?
            this.__params[name] :
            undefined;
    }

    /**
     * @throws {Error}
     * @return {*}
     */
    callHandler() {
        const call = callable => {
            const params = this.getParameters();
            if (params instanceof Array)
                return callable(...params);

            return callable(params);
        };

        const handler = this.__handler;
        if (typeof handler === 'function')
            return call(handler);

        const [controllerName, methodName] = handler.split('@');
        const controller = Application.make(controllerName);

        return call(controller[methodName]);
    }
}