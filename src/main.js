import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import createHttpPlugin from "./plugins/http.js";
import initErrorsAlerts from "./connectors/initErrorsAlerts.js";
import { createApi } from "./api/index.js";
import createStore from "./store/index.js";
import createRouter from "@/router/index.js";
import initPagesAuthGuard from './connectors/initPagesAuthGuard';

export default async function makeApp() {
    const app = createApp(App);
    const http = createHttpPlugin()
    const api = createApi(http);
    const pinia = createPinia();
    const store = createStore(pinia, api);
    const router = createRouter();

    app.use(pinia);
    app.use(router);

    app.provide('api', api);
    app.provide('store', store);

    initPagesAuthGuard(router, store.useUser)
    initErrorsAlerts(http, store.useUser, store.useAlerts);

    if(!import.meta.env.SSR) {
        store.useCart().initCart();
    }

    const products = await api.catalog.all();
    store.useCatalog().setProducts(products);

    return { app, store, api, http, pinia, router }
}
