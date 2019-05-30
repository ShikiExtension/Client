class NavigationObserver {
    register () {
        document.addEventListener('turbolinks:load', function (e) {
            Application.emit('page-changed', e);
        });
    }
}