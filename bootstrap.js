App.boot();

const router = App.get('Router');
App.subscribe('page-changed', () => {
    router.dispatch().catch(e => {});
});
App.emit('page-changed');