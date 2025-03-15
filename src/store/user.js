import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { setTokens, cleanTokensData, getJWTPayload, getAccessToken } from '@/utils/tokens';

export default function createUserStore(authApi){
  return defineStore('user', () => {
    let readyResolver = null;
    const ready = new Promise(resolve => readyResolver = resolve);
    const user = ref(null)
    const isLogin = computed(() => user.value !== null);
    const checkRole = computed(() => allowedRoles => user.value !== null && allowedRoles.some(role => user.value.roles.includes(role)))

    async function login({login, password}){
      let { res, data } = await authApi.login(login, password);

      if(!res){
        return { errors: 'Нет связи' }
      }
      else if(data.res){
        setTokens(data.accessToken);
        let { login, name, roles } = getJWTPayload(data.accessToken);
        this.user = { login, name, roles };
      }

      return data;
    }

    async function autoLogin(){
      let { res } = await authApi.check();

      if(res) {
        let { login, name, roles } = getJWTPayload(getAccessToken());
        user.value = { login, name, roles };
      }

      readyResolver();
    }

    async function logout(){
      let { res } = await authApi.logout();

      if(res){
        clean()
      }

      return res;
    }

    async function clean(){
      cleanTokensData();
      user.value = null;
    }
    function setUser(newUser) {
      user.value = newUser;
      readyResolver();
    }

    return {  user, login, autoLogin, ready, isLogin, checkRole, logout, clean, setUser }
  });
}