class FetchWrapper {
    /**
     * @param {Promise<Response>}FetchPromise
     * @constructor
     */
    constructor(FetchPromise) {
        this.promise = FetchPromise;
    }

    /**
     * @return {Promise<object>}
     */
    json() {
        return this.promise.then(res => res.json());
    }

    /**
     * @param {function} onFulfilled
     * @param {function} [onRejected]
     *
     * @return {Promise<*>}
     */
    then(onFulfilled, onRejected){
        return this.promise.then(onFulfilled, onRejected);
    }

    /**
     * @param {function} onRejected
     *
     * @return {Promise<Response>}
     */
    catch(onRejected){
        return this.promise.catch(onRejected);
    }

    /**
     * @param {function} onFinally
     * @return {Promise<Response>}
     */
    finally(onFinally){
        return this.promise.finally(onFinally);
    }
}