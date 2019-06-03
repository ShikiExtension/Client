class URLResolver {

    /**
     * @param {string} url
     * @param {Array|Object} parameters
     *
     * @return {string}
     */
    static resolve(url, parameters) {
        let result = url;
        if (parameters instanceof Array) {
            parameters.forEach(
                val => result = result.replace('*', val)
            );
        } else if(typeof parameters === 'object')
            Object.keys(parameters).forEach(
                key => result = result.replace(`:${key}`, parameters[key])
            );

        return result;
    };
}