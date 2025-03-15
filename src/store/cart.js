import { defineStore } from "pinia";
import { ref, computed, reactive } from 'vue'

export default function createCartStore(useCatalog, cartApi){
  return defineStore('cart', () => {
    const cart = reactive([]);
    const token = ref(null);
    let proccessId = reactive([]);

    const total = computed(() => {
      const catalogStore = useCatalog();

      return cart.reduce((total, cartItem) => {
        return total + catalogStore.getProduct(cartItem.id).price * cartItem.cnt;
      }, 0);
    });

    const inProccess = (id) => proccessId.includes(id);

    const inCart = (id) => cart.some(item => item.id === id);
    const cartCnt = (id) => cart.find(item => item.id === id)?.cnt ?? 0;

    const hasAdd = (id) => !inCart(id) && !inProccess(id);
    const hasUpdate = (id) => inCart(id) && !inProccess(id);

    async function initCart(){
      let savedToken = localStorage.getItem('cartToken');
      let { data } = await cartApi.load(savedToken);

      if(data) {
        if(data.needUpdate){
          localStorage.setItem('cartToken', data.token);
        }

        cart.push(...data.cart);
        token.value  = data.token;
      }
    }

    async function add(id){

      if(hasAdd(id)){
        proccessId.push(id);

        const res = await cartApi.add(token.value, id);

        if(res){
          cart.push({ id, cnt: 1 });
        }

        proccessId.splice(0, proccessId.length, ...proccessId.filter(id => id !== id));
      }
    }

    async function remove(id){
      if(hasUpdate(id)){
        proccessId.push(id);

        const res = await cartApi.remove(token.value, id);

        if(res){
          const index = cart.findIndex(cartItem => cartItem.id === id);
          cart.splice(index, 1);
        }

        proccessId.splice(0, proccessId.length, ...proccessId.filter(id => id !== id));
      }
    }

    async function setCnt(id, cnt){
      if(hasUpdate(id)){
        proccessId.push(id);
        const res = await cartApi.change(token.value, id, cnt);

        if(res){
          const item = cart.find(cartItem => cartItem.id === id);
          item.cnt = cnt; // we can duplicate validation here
        }

        proccessId.splice(0, proccessId.length, ...proccessId.filter(id => id !== id));
      }
    }

    function productsDetailed() {
      const catalogStore = useCatalog();

      return cart.map(valuesProduct => {
        let { title, price } = catalogStore.getProduct(valuesProduct.id);

        return {
          ...valuesProduct,
          title,
          price
        }
      });
    }

    return { cart, total, initCart, add, remove, setCnt, inCart, cartCnt, productsDetailed, proccessId, inProccess }
  })
}