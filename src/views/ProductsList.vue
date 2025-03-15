<template>
  <div>
    <h1>Products</h1>
    <div class="row">
      <div v-for="item in catalogStore.products" :class="$style.col" class="col col-sm-4">
        <div class="card">
          <div class="card-body">
            <h2>{{ item.title }}</h2>
            <div>{{ item.price }}</div>
            <RouterLink :to="{ name: 'products-item', params: { id: item.id } }">Read more</RouterLink>
            <hr>
            <AppProductControls :id="item.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject } from 'vue'
  const catalogStore = inject('store').useCatalog();
  import AppProductControls from './../components/products/Controls.vue'
</script>

<style module>
.col{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>