const Container = (() => {
    const bindings = {};

    const getInstanceByName = (name, args) => {
        const constructor = new Function('args', 'return new ' + name + '(...args);');

        return constructor(args);
    };

    const getInstanceByRealisation = (realisation, args) => {
        args = args || [];

        if (typeof realisation === 'function')
            return realisation(...args);

        if (typeof realisation === 'string')
            return getInstanceByName(realisation, args);

        return realisation;
    };

    class Container {
        /**
         * @param {string} abstract
         * @param {object|function|string} concrete
         * @static
         */
        static bind(abstract, concrete) {
            bindings[abstract] = concrete;
        }

        /**
         * @param {string} abstract
         * @param {object|function|string} concrete
         * @static
         */
        static singleton(abstract, concrete) {
            const getClosure = (concrete) => {
                let instance;

                return () => instance ?
                    instance :
                    instance = getInstanceByRealisation(concrete);
            };

            this.bind(abstract, getClosure(concrete));
        }

        /**
         * @param {string} name
         * @param {*} [args]
         *
         * @return {object|undefined}
         * @static
         */
        static make(name, ...args) {
            return getInstanceByRealisation(
                name in bindings ? bindings[name] : name,
                args
            );
        }

        /**
         * @param {string} name
         * @return {*}
         */
        static get(name) {
            return Container.make(name);
        }
    }

    return Container;
})();