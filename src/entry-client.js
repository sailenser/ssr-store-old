import makeApp from "./main.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './scss/styles.scss'

(async function () {
    const { app, api, store} = await makeApp();

    app.mount('#app');
    store.useUser().autoLogin();
})();