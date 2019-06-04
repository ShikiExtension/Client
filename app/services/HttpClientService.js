class HttpClientService extends CrossOriginHttpClient {
    /**
     * @constructor
     */
    constructor() {
        super();

        this.url = null;
    }

    /**
     * @param {string} url
     * @param {Array|Object} [params]
     * @return {HttpClientService}
     */
    resolveUrl(url, params) {
        this.url = URLResolver.resolve(url, params);

        return this;
    }

    /**
     * @param {string} configName
     * @param {Array|Object} [params]s
     * @return {HttpClientService}
     */
    resolveUrlByConfig(configName, params) {
        return this.resolveUrl(
            App.config(configName),
            params
        );
    }

    /**
     * @param {string|null} [url]
     * @param {ArrayBuffer|ArrayBufferView|Blob|File|string|URLSearchParams|FormData} [data]
     *
     * @return {FetchWrapper}
     */
    get(url, data) {
        return this.request(HttpClient.METHODS.GET, url, data);
    }

    /**
     * @param {string|null} [url]
     * @param {ArrayBuffer|ArrayBufferView|Blob|File|string|URLSearchParams|FormData} [data]
     *
     * @return {FetchWrapper}
     */
    post(url, data) {
        return this.request(HttpClient.METHODS.POST, url, data);
    }

    /**
     * @param {string} method   One of HttpClient.METHODS
     * @param {string|null} [url]
     * @param {ArrayBuffer|ArrayBufferView|Blob|File|string|URLSearchParams|FormData} [data]
     *
     * @return {FetchWrapper}
     */
    request(method, url, data) {
        return super.request(method, url || this.url, data);
    }
}