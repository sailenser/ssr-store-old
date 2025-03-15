import createCardApi from "./cart.js";
import createCatalogApi from "./catalog.js";
import createAuthApi from "./auth";

export function createApi(http) {
    return {
        cart: createCardApi(http),
        catalog: createCatalogApi(http),
        auth: createAuthApi(http),
    }
}
