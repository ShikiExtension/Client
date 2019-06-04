class CrossOriginHttpClient extends HttpClient {

    /**
     * @param {string}url
     * @param {Object} options
     *
     * @return {Promise<Response>}
     * @protected
     */
    sendRequest(url, options) {
        const listener = res => {
            const response = new Response(res.body, {
                status: res.status,
                statusText: res.statusText,
                headers: new Headers(res.headers)
            });

            return Promise[res.success ? 'resolve' : 'reject'](response);
        };

        options.headers = options.headers ? Converter.headersToObject(options.headers) : {};

        return Background.sendCommand('SendRequest', {url, options}).then(listener, listener);
    }
}