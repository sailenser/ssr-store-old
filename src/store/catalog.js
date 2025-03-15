import { defineStore } from "pinia";
import { reactive } from 'vue'

export default function createCatalogStore(cartApi){
    return defineStore('catalog', () => {
        let products = reactive([]);
        const getProduct = (id) => products.find(pr => pr.id === id);

        function setProducts(items){
            products.splice(0, products.length - 1);
            products.push(...items);
        }

        return { products, getProduct, setProducts  }
    })
}