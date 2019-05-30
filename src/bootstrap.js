Application.boot();

Application.get('Router').dispatch().catch(e => {});