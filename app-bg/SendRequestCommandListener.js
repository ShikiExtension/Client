allowedBackgroundCommands.SendRequest = (() => {
    // The requests from background not cached automatically
    const cache = new Cache();

    return (request, sender, sendResponse) => {
        const cacheEnabled = request.options.cache !== HttpClient.CACHE.NO_CACHE;
        const cacheKey = cacheEnabled ? JSON.stringify(request) : null;

        if (cacheEnabled && cache.has(cacheKey))
            return void sendResponse(
                cache.get(cacheKey)
            );

        fetch(request.url, request.options).then(res => {
            return res.text().then(body => {
                return Build.success({
                    status: res.status,
                    statusText: res.statusText,
                    headers: Converter.headersToObject(res.headers),
                    redirected: res.redirected,
                    body
                });
            });
        }).catch(res => {
            return Build.error({
                status: res.status,
                statusText: res.statusText,
                headers: Converter.headersToObject(res.headers)
            });
        }).then(message => {
            cacheEnabled && cache.set(cacheKey, message);

            sendResponse(message);
        });
    };
})();