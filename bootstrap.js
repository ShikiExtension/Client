App.boot();

const router = App.get('Router');
const dispatch = () => {
    router.dispatch().catch(e => {});
};

App.subscribe('page-changed', dispatch);

dispatch();