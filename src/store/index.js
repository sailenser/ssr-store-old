import createCatalogStore from "./catalog.js";
import createCartStore from "./cart.js";
import createUserStore from "./user.js";
import createCounterStore from "./counter.js";
import createAlertsStore from "./alerts.js";

export default function createStore(pinia, api) {
    const useCatalog = createCatalogStore().bind(null, pinia);
    const useUser = createUserStore(api.auth).bind(null, pinia);
    const useAlerts = createAlertsStore().bind(null, pinia);
    const useCart = createCartStore(useCatalog, api.cart).bind(null, pinia);
    const useCounter = createCounterStore().bind(null, pinia);

    return {
        useCatalog,
        useAlerts,
        useUser,
        useCart,
        useCounter
    }
}