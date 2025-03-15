<template>
  <span>{{ data.price }}</span>
</template>

<script setup>
  import { inject, reactive  } from "vue";

  const props = defineProps({
    id: { type: Number, required: true }
  });

  const api = inject('api');
  const { data } = reactive(await api.catalog.one(props.id));

  // TODO: если несколько запросов в suspend
  /*
  const [productInfo1, productInfo2] = await Promise.all([
    api.catalog.one(props.id),
    api.catalog.one(props.id + 2)
  ])
  */
</script>