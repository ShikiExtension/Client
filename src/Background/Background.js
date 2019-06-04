class Background {

    /**
     * @param {string} command
     * @param {Object} request
     * @return {Promise<*>}
     */
    static sendCommand(command, request) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({
                command: command,
                request: request
            }, function(response) {
                if (Background.isError(response))
                    return void reject(
                        new Error(response.message || 'Something went wrong')
                    );

                resolve(response);
            });
        });
    }

    /**
     * @param {Object} response
     * @return {boolean}
     */
    static isError(response) {
        return response.success === false;
    }
}