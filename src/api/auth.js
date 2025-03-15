export default function createAuthApi(http) {
  return {
    async login(login, password){
      let { data } = await http.post('auth/login.php', { login, password }, {
        errorAlert: 'при попытке логина'
      });

      return data;
    },
    async check(){

      try {
        let { data } = await http.get('auth/check.php', {
          appSilence401: true
        });
        return data;
      }
      catch(e){
        return { res: false };
      }
    },
    async logout(){
      let { data } = await http.get('auth/logout.php', {
        errorAlert: 'при попытке выхода с сайта'
      });

      return data;
    }
  }
}






/*
  IN REAL THESE FUNCTION WORK WITH HTTP REQUESTS
  LOCALSTORAGE JUST THE SAMPLE
  sorry BAD ENglish
*/
/*
const userFromServer = {
  id: 1,
  name: 'admin',
  email: '1@1.ru'
}

export async function login({ email, password }){
  await timeout(300);

  if(email == '1@1.ru' && password == 'qwerty'){
    localStorage.setItem('auth', '1');
    return true;
  }
  else{
    return false;
  }
}

export async function logout(){
  await timeout(300);

  localStorage.removeItem('auth');
}

export async function check(){
  await timeout(300);

  return localStorage.getItem('auth') == '1' ? userFromServer : null;
}

function timeout(t){
  return new Promise(r => setTimeout(r, t));
}
*/