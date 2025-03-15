import { getAccessToken, setTokens, cleanTokensData } from '@/utils/tokens';
import createUserStore from "@/store/user.js";
export default function initErrorsAlerts(http, useUserStore, useAlertsStore) {
    http.interceptors.request.use(request => {
        let token = getAccessToken();

        if(token !== null){
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    });

    http.interceptors.response.use(
        r => r,
        async error => {
            if(error.response.status !== 401){
                return Promise.reject(error); // ошибка, не связанная с авторизацией
            }

            cleanTokensData();
            let response = await http.get('auth/refresh/refresh.php');

            if(!response.data.res){
                return Promise.reject(error); // прокидываем 401 код дальше
            }

            setTokens(response.data.accessToken);
            return addAccessToken(error.config);
        }
    );

   function addResponseHandler(success, error){
        http.interceptors.response.use(success, error);
    }

    //Интерсептор обраторки ошибок
    addResponseHandler(
        function(response){
            if('errorAlert' in response.config) {
                let respond = response;
                respond.data = { res: true, data: response.data }
            }
            return response;
        },
        function(error){
            let config = error.response.config;
            const storeUser = useUserStore();
            const storeAlert = useAlertsStore();

            if(error.response.status == 401 && config.appSilence401 !== true){
                // clean user data & tokens
                storeUser.clean()

                router.push({name: 'login'}).then(() => {
                    location.reload();
                });
                return;
            }

            if('errorAlert' in config){
                let { errorAlert } = config;

                if(typeof errorAlert === 'string'){
                    errorAlert = { text: errorAlert };
                }

                storeAlert.add({
                    text: 'Ошибка ответа от сервера ' + errorAlert.text,
                    timeout: errorAlert.timeout ?? 5000,
                    critical: errorAlert.critical ?? false
                });

                return { data: { res: false, data: null }};
            }

            return Promise.reject(error);
        }
    );

    function addAccessToken(request){
        let token = getAccessToken();

        if(token !== null){
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    }
}



