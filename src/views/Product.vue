<template>
  <div v-if="hasProduct">
    <h1>{{ product.title }}</h1>
    <hr>
    <div>
      <router-link :to="{ name: 'products-item', params: { id: product.id + 1 }}">
        Next
      </router-link>
    </div>
    <hr>
      <div class="alert alert-success">
        <Suspense :key="product.id">
          <ProductInfo :id="product.id" :key="product.id"></ProductInfo>
          <template #fallback>Loading...</template>
        </Suspense>
      </div>
    <hr>
    <AppProductControls :id="product.id" />
    <hr>
    <router-link :to="{name: 'products'}">
      Back to products
    </router-link>
    <hr>
    <div class="mb-3">
      Current Product Rating: {{ rating.average }} ({{ rating.count }} marks)
    </div>
    <div v-if="canSetRating" class="row">
      <div class="col col-2">
        <div><small>Your last mark: userMark.last </small></div>
        <div><small>Your current mark: userMark.current </small></div>
      </div>
      <div class="col col-8">
        <AppRating v-model:value="userMark.current"></AppRating>
      </div>
      <div class="col col-2">
        <button class="btn btn-primary" :disabled="!canSendMark" @click="sendMark">Send</button>
      </div>
    </div>
    <hr>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis voluptate necessitatibus ullam dolorum laudantium, eos deleniti cupiditate atque magnam autem dignissimos aliquam aut aliquid quae vero, quaerat consectetur eius animi!</p>
    <p>Iusto facere fuga, voluptatum numquam optio eos modi aliquam, odit a ad alias ex laborum quis voluptates, iste incidunt! Veritatis rem fuga aspernatur, sapiente saepe iste libero ab quo aliquid.</p>
    <p>Consequatur nulla voluptates cum minus illo tempore architecto magnam dolorem reiciendis saepe, recusandae eaque nihil beatae mollitia minima quae natus, facilis. Maxime dolore, nobis. Iusto numquam eligendi amet enim inventore!</p>
    <p>Qui reprehenderit quae, ipsam odio tempore minima molestias placeat vel, eius quidem itaque assumenda sed dolores a commodi, quibusdam fuga eveniet cum. Doloremque, assumenda rem. Vel perferendis architecto, ab magnam.</p>
  </div>
  <App404 v-else />
</template>

<script setup>
import { useRoute } from 'vue-router'
import {computed, inject, reactive} from 'vue'
import AppProductControls from "@/components/products/Controls.vue";
import ProductInfo from "@/components/products/ProductInfo.vue";
import App404 from '@/components/E404.vue';
import AppRating from '@/components/Rating.vue';
import useRouteInt from '../composables/useRouteInt';

const { params } = useRoute()
const { useCatalog, useUser } = inject('store');
const api = inject('api');
const [ catalogStore, userStore ] = [useCatalog(), useUser()];
const { value, valid } = useRouteInt('id')
const product = computed(() => valid.value ? catalogStore.getProduct(value.value) : undefined);

const hasProduct = computed(() => {
  return typeof product.value !== 'undefined';
})

const rating = reactive({
  average: 0,
  count: 0,
  your: null
})

const userMark = reactive({
  current: 0,
  last: 0,
  pending: false
})

created();

const canSetRating = computed(() => {
  return userStore.checkRole(['auditor']);
})

const canSendMark = computed(() => {
  return !userMark.pending && userMark.current != userMark.last;
})

async function getRating() {
  let { res, data } = await api.catalog.rating(parseInt(params.id));

  if(res){
    let { average, count, your } = data;
    rating.average = average;
    rating.count = count;
    rating.your = your;

    if(your !== null){
      userMark.last = your;
      userMark.current = your;
    }
  }
}
async function sendMark() {
  if(canSendMark.value){
    userMark.pending = true;

    let { res, data } = await api.catalog.mark(parseInt(params.id), userMark.current);

    if(res && data){
      await getRating();
    }

    userMark.pending = false;
  }
}
async function created() {
  await userStore.userReady;
  getRating();
}

</script>