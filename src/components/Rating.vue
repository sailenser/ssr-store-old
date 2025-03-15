<template>
	<div class="ratings">
		<i 
			v-for="num in props.max"
			:key="num"
			:class="{ 'rating-color': num <= props.value  }"
			@click="$emit('update:value', num)"
		>&#9734;</i>
	</div>
</template>
<script setup>

import { defineProps } from 'vue'

const props = defineProps({
  value: Number,
  max: {
    type: Number,
    default: 5
  }
})
</script>

<style scoped>
.ratings {
	margin-right: 10px;
}

.ratings i {
	color: #cecece;
	font-size: 32px;
	font-style: normal;
}

.rating-color {
	color: #fbc634 !important;
}
</style>