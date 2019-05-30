Application.registerProvider(ServiceProvider.provide);

Application.subscribe('page-changed', console.log.bind(console));

Application.boot();