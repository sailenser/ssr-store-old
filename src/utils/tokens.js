const LOCAL_ACCESS_NAME = 'auth_accessToken';

function setTokens(access){
    if (!import.meta.env.SSR) {
        localStorage.setItem(LOCAL_ACCESS_NAME, access);
    }
}

function cleanTokensData(){
    if (!import.meta.env.SSR) {
        localStorage.removeItem(LOCAL_ACCESS_NAME);
    }
}

function getAccessToken(){
    return !import.meta.env.SSR ? localStorage.getItem(LOCAL_ACCESS_NAME) : null;
}

function getJWTPayload(token){
    return parseJWT(token).payload;
}

function parseJWT(token){
    let parts = token.split('.');

    return {
        header: parsePart(parts[0]),
        payload: parsePart(parts[1]),
        sign: parts[2]
    };
}

function parsePart(str){
    return JSON.parse(window.atob(str));
}

export { setTokens, cleanTokensData, getJWTPayload, getAccessToken }