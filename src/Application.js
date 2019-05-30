const Application = (() => {
    const ConfigInstance = new Config();
    const providers = [
        ServiceProvider.provide
    ];

    const EventEmitter = (() => {
        const container = {};

        class EventEmitter extends Container{
            /**
             * @param {string} eventName
             * @param {*} [args]
             */
            static emit(eventName, ...args) {
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
            static subscribe(eventName, listener) {
                if (!(eventName in container))
                    container[eventName] = [];

                return container[eventName].push(listener);
            }
        }

        return EventEmitter;
    })();

    let AppLoader,
        AppLoaderAvailable = true;

    const ApplicationLoader = (() => {
        const getProviderException =
            () => new Error('Provider is no longer available');

        class ApplicationLoader {
            /**
             * @throws {Error}
             * @constructor
             */
            constructor() {
                if (AppLoader)
                    throw getProviderException();
            }

            /**
             * @param {string} name
             * @param {object} values
             *
             * @throws {Error}
             */
            setConfig(name, values) {
                if (!AppLoaderAvailable)
                    throw getProviderException();

                ConfigInstance.set(name, values);
            }
        }

        return ApplicationLoader;
    })();

    AppLoader = new ApplicationLoader();

    class Application extends EventEmitter {

        /**
         * @param {string} name
         */
        static config(name) {
            return ConfigInstance.get(name);
        }

        /**
         * @param {function<ApplicationLoader>} callable
         * @return {number}
         */
        static registerProvider(callable) {
            return providers.push(callable);
        }

        /**
         * @return {void}
         */
        static boot() {
            let provider;
            while (provider = providers.shift()) {
                provider(AppLoader);
            }
        }
    }

    return Application;
})();