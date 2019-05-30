const Application = (() => {
    let providerAllowed = true;

    const configs = {};
    const services = {};
    const providers = [];

    const EventEmitter = (()=>{
        const container = {};

        class EventEmitter {
            /**
             * @param {string} eventName
             * @param {*} [args]
             */
            static emit (eventName, ...args) {
                if (!container[eventName])
                    return;

                container[eventName].forEach(function (listener) {
                    listener(...args);
                });
            }

            /**
             * @param {string} eventName
             * @param {function} listener
             *
             * @return {number}
             */
            static subscribe (eventName, listener) {
                if (!(eventName in container))
                    container[eventName] = [];

                return container[eventName].push(listener);
            }
        }

        return EventEmitter;
    })();

    const ApplicationLoader = (()=>{
        const getProviderException =
            () => new Error('Provider is no longer available');

        class ApplicationLoader {
            /**
             * @throws {Error}
             * @constructor
             */
            constructor () {
                if (! providerAllowed)
                    throw getProviderException();
            }

            /**
             * @param {string} name
             * @param {object} values
             *
             * @throws {Error}
             */
            setConfig (name, values) {
                if (! providerAllowed)
                    throw getProviderException();

                configs[name] = values;
            }

            /**
             * @param {string} name
             * @param {object|function} concrete
             *
             * @throws {Error}
             */
            registerService (name, concrete) {
                if (! providerAllowed)
                    throw getProviderException();

                services[name] = concrete;
            }
        }

        return ApplicationLoader;
    })();

    class Application extends EventEmitter {

        /**
         * @param {string} name
         */
        static config (name) {
            let result = configs;

            const chain = name.split('.');
            while (name = chain.shift()) {
                if (! (name in result))
                    return undefined;

                result = result[name];
            }

            return result;
        }

        /**
         *
         * @param {string} name
         * @param {Array} [args]
         */
        static service (name, ...args) {
            if (! (name in services))
                throw new Error(`Service ${name} not found`);

            const service = services[name];
            if (typeof service === 'object')
                return service;

            return service.apply(this, args);
        }

        /**
         * @param {function<ApplicationLoader>} callable
         * @return {number}
         */
        static registerProvider (callable) {
            return providers.push(callable);
        }

        /**
         * @return {void}
         */
        static boot () {
            const Loader = new ApplicationLoader();

            let provider;
            while (provider = providers.shift()) {
                provider(Loader);
            }

            providerAllowed = false;
        }
    }

    return Application;
})();