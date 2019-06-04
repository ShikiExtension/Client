class Cache {
    /**
     * @constructor
     */
    constructor() {
        this.__cache = {};
    }

    /**
     * @param {string} key
     * @return {*|null}
     */
    get(key) {
        return this.has(key) ? this.__cache[key] : null;
    }

    /**
     * @param {string} key
     * @param {*} value
     * @return {Cache}
     */
    set(key, value) {
        this.__cache[key] = value;

        return this;
    }

    /**
     * @param {string} key
     * @return {boolean}
     */
    has(key) {
        return key in this.__cache;
    }
}