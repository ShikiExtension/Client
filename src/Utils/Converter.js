class Converter {
    /**
     * @param {Headers} headers
     *
     * @return {Object}
     */
    static headersToObject(headers) {
        const result = {};
        for (const key of headers.keys())
            result[key] = headers.get(key);

        return result;
    }
}