const HttpClient = (() => {
    const isValidUrl = string => /^https?:\/\//i.test(string || '');
    const rightSlashTrim = string => (string || '').replace(/\/+$/, '');
    const leftSlashTrim = string => (string || '').replace(/^\/+/, '');

    const REQUEST_METHODS = {
        GET: 'get',
        POST: 'post'
    };
    const REQUEST_MODE = {
        CORS: 'cors',
        NO_CORS: 'no-cors',
        SAME_ORIGIN: 'same-origin'
    };
    const REQUEST_CREDENTIALS = {
        OMIT: 'omit',
        SAME_ORIGIN: 'same-origin',
        INCLUDE: 'include'
    };
    const REQUEST_CACHE = {
        DEFAULT: 'default',
        NO_STORE: 'no-store',
        RELOAD: 'reload',
        NO_CACHE: 'no-cache',
        FORCE_CACHE: 'force-cache',
        ONLY_IF_CACHED: 'only-if-cached'
    };
    const REQUEST_REDIRECT = {
        FOLLOW: 'follow',
        ERROR: 'error'
    };

    class HttpClient {
        static METHODS = REQUEST_METHODS;
        static MODE = REQUEST_MODE;
        static CREDENTIALS = REQUEST_CREDENTIALS;
        static CACHE = REQUEST_CACHE;
        static REDIRECT = REQUEST_REDIRECT;

        /**
         * @constructor
         */
        constructor() {
            this.baseUrl = null;
            this.headers = new Headers();
            this.cache = HttpClient.CACHE.DEFAULT;

            const config = Application.config('api-urls.remoteServer');
            this.setBaseUrl(`${config.protocol}://${config.host}:${config.port}`);
        }

        /**
         * @param {string} url
         *
         * @return {HttpClient}
         */
        setBaseUrl(url) {
            if (!isValidUrl(url))
                throw new Error('Invalid URL');

            this.baseUrl = rightSlashTrim(url);

            return this;
        }

        /**
         * @param {string} name
         * @param {string} value
         *
         * @return {HttpClient}
         */
        appendHeader(name, value) {
            this.headers.append(name, value);

            return this;
        }

        /**
         * @param {string} behaviorName    One of HttpClient.CACHE
         *
         * @return {HttpClient}
         */
        setCacheBehavior(behaviorName) {
            if (!Object.values(HttpClient.CACHE).includes(behaviorName))
                throw new Error('Invalid value');

            this.cache = behaviorName;

            return this;
        }

        /**
         * @param {string} url
         * @param {ArrayBuffer|ArrayBufferView|Blob|File|string|URLSearchParams|FormData} [data]
         *
         * @return {FetchWrapper}
         */
        get(url, data) {
            return this.request(HttpClient.METHODS.GET, url, data);
        }

        /**
         * @param {string} url
         * @param {ArrayBuffer|ArrayBufferView|Blob|File|string|URLSearchParams|FormData} [data]
         *
         * @return {FetchWrapper}
         */
        post(url, data) {
            return this.request(HttpClient.METHODS.POST, url, data);
        }

        /**
         * @param {string} method   One of HttpClient.METHODS
         * @param {string} url
         * @param {ArrayBuffer|ArrayBufferView|Blob|File|string|URLSearchParams|FormData} [data]
         *
         * @return {FetchWrapper}
         */
        request(method, url, data) {
            if (!Object.values(HttpClient.METHODS).includes(method))
                throw new Error('Invalid request method');

            let requestUrl = this.baseUrl;
            requestUrl = requestUrl ? requestUrl + '/' : '';
            requestUrl += leftSlashTrim(url);

            let cache = this.cache;

            const FetchPromise = fetch(
                requestUrl,
                {
                    method,
                    body: data,
                    headers: this.headers,
                    mode: HttpClient.MODE.NO_CORS,//TODO: change to CORS
                    credentials: HttpClient.CREDENTIALS.OMIT,
                    cache,
                    redirect: HttpClient.REDIRECT.FOLLOW
                }
            );

            return new FetchWrapper(FetchPromise);
        }
    }

    return HttpClient;
})();