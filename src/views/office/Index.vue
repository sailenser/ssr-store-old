<template>
  <div>
    <h1>Личный кабинет</h1>
    <hr>
    <button type="button" class="btn btn-danger" @click="makeLogout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { inject } from "vue";

const userStore = inject('store').useUser();
const router = useRouter();

async function makeLogout(){
  let res = await userStore.logout();

  if(res){
    router.push({name: 'login'}).then(() => {
      location.reload();
    });
  }
}
</script>