const Config = (() => {
    let instance;
    const configs = {};

    class Config {
        /**
         * @throws {Error}
         */
        constructor() {
            if (instance)
                throw new Error('Illegal invocation');

            return instance = this;
        }

        /**
         * @param {string} name
         * @param {object} values
         */
        set(name, values) {
            configs[name] = values;
        }

        /**
         * @param {string} name
         *
         * @return {any}
         */
        get(name) {
            let result = configs;

            const chain = name.split('.');
            while (name = chain.shift()) {
                if (!(name in result))
                    return undefined;

                result = result[name];
            }

            return result;
        }
    }

    return Config;
})();