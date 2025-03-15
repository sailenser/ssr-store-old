<template>
    <div>
      <div class="col col-auto">
        <button v-if="cartCnt > 0" @click="cartStore.remove(id)" :disabled="cartStore.inProccess(props.id)" class="btn btn-danger">Remove</button>
        <button v-else @click="cartStore.add(id)" :disabled="cartStore.inProccess(props.id)" class="btn btn-success">Add to cart</button>
      </div>
      <transition name="slide">
      <div class="col col-auto">
        <hr>
        <AppMinMax
            v-if="cartCnt > 0"
            :min="1"
            :max="product.rest"
            :value="tmpCartCnt"
            @change="onSetCnt"
            :id="props.id"
        />
      </div>
      </transition>
    </div>
</template>

<script setup>
import AppMinMax from './../MinMax.vue'
import { ref, computed, watch, inject } from 'vue'

// const cartStore = inject('store').useCart();
// const catalogStore = inject('store').useCatalog();

const { useCart, useCatalog } = inject('store');
const [ cartStore, catalogStore ] = [useCart(), useCatalog()]


const props = defineProps({
  id: { type: Number, required: true }
});

const product = computed(() => catalogStore.getProduct(props.id));
const cartCnt = computed(() => cartStore.cartCnt(product.value.id));
const tmpCartCnt = ref(cartCnt.value);

watch(cartCnt, () => {
  tmpCartCnt.value = cartCnt.value;
})

let cntTimeout = null;

function onSetCnt(cnt){
  tmpCartCnt.value = cnt;

  clearTimeout(cntTimeout);
  cntTimeout = setTimeout(() => cartStore.setCnt(props.id, tmpCartCnt.value), 300)
}

</script>