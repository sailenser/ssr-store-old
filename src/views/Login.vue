<template>
  <form>
    <div>
      <div>some qwerty!q</div>
      <div>manager qwerty!q</div>
      <div>
        <input type="text" v-model="authData.login" name="login" placeholder="Login">
      </div>
      <div>
        <input type="password" v-model="authData.password" placeholder="Password">
      </div>
      <div>
        <button type="button" class="btn btn-primary" @click="tryLogin">Login</button>
      </div>
      <div v-if="authData.errorText != ''">
        <p class="mt-2 mb-0 text-danger">{{ authData.errorText }}</p>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, inject } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = inject('store').useUser();

const authData =  reactive({
  login: '',
  password: '',
  errorText: ''
})

async function tryLogin() {
  let login = await userStore.login({
    login: authData.login,
    password: authData.password
  });

  if(login.res) {
    authData.login = '';
    authData.password = '';
    authData.errorText = '';
    //router.push({name: 'office'}); // TODO: конечно, мы можем использовать router.push, но перезагрузка страницы после входа в систему - хорошая практика
    document.location = '/office';
  } else {
    authData.errorText = login.errors;
  }
}
</script>