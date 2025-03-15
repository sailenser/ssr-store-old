import { ref } from "vue";
import { defineStore } from 'pinia'

export default function createCounterStore(){
    return defineStore('counter', () => {
        const init = Math.floor(Math.random()*1000);
        const count = ref(init);
        function increment() {
            count.value++
        }

        return { count, increment }
    })
}
