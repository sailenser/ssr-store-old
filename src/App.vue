<template>
  <div class="grid-box">
    <header class="mt-3">
      <div class="container">
        <AppAlerts />
        <div> Profile --> {{ userStore.isLogin ? userStore.user.name : 'guest' }}</div>
        <div class="row justify-content-between">
          <div class="col flex-norm">
            <div class="h3">Sample site</div>
            <div>About some and other products</div>
          </div>
          <div class="col flex-norm">
            <div>In Cart:  {{ cartStore.cart.length }}</div>
            <div>Total: {{ cartStore.total }}</div>
          </div>
        </div>
        <hr>
        <nav class="navbar navbar-expand p-0">
          <ul class="navbar-nav">
            <li v-for="item in menuItems.value" :key="item.route" class="nav-item">
              <router-link
                  :to="{name: item.route}"
                  :exact="item.exact"
                  class="nav-link"
                  active-class="active"
              >{{item.title}}</router-link>
            </li>
            <li v-if="userStore.isLogin">
              <router-link
                  :to="{name: 'office'}"
                  :exact="false"
                  key="office"
                  class="nav-link"
                  active-class="active"
              >Office</router-link>
            </li>
            <li v-else>
              <router-link
                  :to="{name: 'login'}"
                  :exact="false"
                  key="login"
                  class="nav-link"
                  active-class="active"
              >Login</router-link>
            </li>
          </ul>
        </nav>
        <hr>
      </div>
    </header>
    <section>
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </section>

    <footer class="mb-3">
      <div class="container">
        <hr>
        <div>&copy; Rights not found</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { reactive, inject  } from 'vue'
import AppAlerts from '@/components/Alerts.vue';

const { useCart, useUser } = inject('store');
const [ cartStore, userStore ] = [useCart(), useUser()]

const menuItems = reactive({ value: [
    { route: 'products', title: 'Products', exact: true },
    { route: 'cart', title: 'Cart', exact: true },
    { route: 'checkout', title: 'Checkout', exact: true },
  ]
});
</script>
