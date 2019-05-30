const NavigationObserver = (() => {
    let registered = false;

    class NavigationObserver {
        register() {
            if (registered)
                return;

            document.addEventListener('turbolinks:load', function (e) {
                Application.emit('page-changed', e);
            });

            registered = true;
        }
    }

    return NavigationObserver;
})();