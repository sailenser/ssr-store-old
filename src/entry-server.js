import makeApp from "./main.js";

// TODO: not run it

export default async function runApp(url) {
    const { app, router, store } = await makeApp();

    store.useUser().setUser(null);

    router.push(url);
    await router.isReady();

    return { app, router, store };
}