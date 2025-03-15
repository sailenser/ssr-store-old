<template>
  <button @click="onUpdate(value - 1)" :disabled="value <= min && disableNearMin || checkInProccess(id)" class="btn btn-danger">
    -
  </button>
  <input ref="inp" :value="value" @change="onUpdate(+$event.target.value)" class="mx-2" :class="$style.inputCnt" type="text">
  <button @click="onUpdate(value + 1)" :disabled="value >= max && disableNearMax || checkInProccess(id)" class="btn btn-success">
    +
  </button>
</template>

<script setup>
  import { inject, ref } from 'vue'
  import { nextTick } from 'vue';
  const cartStore = inject('store').useCart();

  const props = defineProps({
    min: { type: Number, required: true, default: 1 },
    max: { type: Number, required: true },
    value: { type: Number, required: true },
    disableNearMin: { type: Boolean, default: true },
    disableNearMax: { type: Boolean, default: true },
    id: {type: Number}
  });

  const emit = defineEmits(['change'])

  function onUpdate(newCnt) {
    const realCnt = isNaN(newCnt) ? props.min : Math.min(Math.max(newCnt, props.min), props.max);
    emit('change', realCnt);

    nextTick(() => {
      if (props.value.toString() !== inp.value.value) {
        inp.value.value = props.value; // Прямое обновление поля ввода
      }
    });
  }

  function checkInProccess(id) {
    return cartStore.inProccess(id);
  }

  const inp = ref(null);
</script>

<style module>
  .inputCnt{
    width: 50px;
  }
</style>