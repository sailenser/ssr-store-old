import { defineStore } from 'pinia'
import {computed, reactive, ref} from 'vue'

export default function createAlertsStore(){
    return defineStore('alerts', () => {
        const lastAI = ref(0);
        let messages = reactive([]);

        const all = computed(() => messages);
        function add({text, timeout, critical}) {
            messages.push({ id: ++lastAI.value, text, critical });

            let lastAIs = lastAI.value;

            if(!critical){
                setTimeout(() => {
                    messages = messages.filter(msg => msg.id !== lastAIs);
                }, timeout);
            }
        }

        return {
            lastAI, messages, all, add
        }
    })
}