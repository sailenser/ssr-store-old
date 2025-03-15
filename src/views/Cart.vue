<template>
  <div>
    <h1>Cart</h1>
    <hr>
    <div v-if="hasProducts">
      <table class="table table-bordered table-hover">
        <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Cnt</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.cnt }}</td>
          <td>{{ product.price * product.cnt }}</td>
          <td>
            <button
                type="button"
                class="btn btn-warning mr-1"

                @click="cartStore.setCnt(product.id, product.cnt - 1)"
            >-</button>
            <button
                type="button"
                class="btn btn-success mr-1"
                @click="cartStore.setCnt(product.id, product.cnt + 1)"

            >+</button>
            <button
                type="button"
                class="btn btn-danger"
                @click="cartStore.remove(product.id)"

            >X</button>
          </td>
        </tr>
        </tbody>
      </table>
      <hr>
      <router-link class="btn btn-primary" :to="{name: 'checkout'}">
        Order Now
      </router-link>
    </div>
    <div v-else class="alert alert-warning">
      Yout cart is empty!
    </div>
  </div>
</template>

<script setup>
  import { computed, inject } from 'vue'
  const { useCart } = inject('store');
  const cartStore = useCart();

  const products = computed(() => {
    return cartStore.productsDetailed();
  })

  const hasProducts = computed(() => {
    return products.value.length > 0;
  })
</script>

<style>
  .btn {
    margin-left: 3px;
    margin-right: 3px;
  }
</style>