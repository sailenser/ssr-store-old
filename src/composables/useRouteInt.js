import { computed } from "vue";
import { useRoute } from "vue-router";

export default function useRouteInt(name){
    const strValue = computed(() => useRoute().params[name]);
    const valid = computed(() => /^[1-9]+\d*$/.test(strValue.value));
    const value = computed(() => valid.value ? +strValue.value : NaN);

    return { valid, value };
}