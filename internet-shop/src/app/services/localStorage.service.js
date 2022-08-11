const APP_KEY = "music-shop-";

const TOKEN_KEY = "jwt-base-active";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export function getValue(key) {
    return localStorage.getItem(APP_KEY + key);
}
export function removeValue(key) {
    localStorage.removeItem(APP_KEY + key);
}
export function setValue(key, value) {
    localStorage.setItem(APP_KEY + key, value);
}
export function setTokens({ refreshToken, accessToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(APP_KEY + TOKEN_KEY, accessToken);
    localStorage.setItem(APP_KEY + REFRESH_KEY, refreshToken);
    localStorage.setItem(APP_KEY + EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
    return localStorage.getItem(APP_KEY + TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(APP_KEY + REFRESH_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(APP_KEY + TOKEN_KEY);
    localStorage.removeItem(APP_KEY + REFRESH_KEY);
    localStorage.removeItem(APP_KEY + EXPIRES_KEY);
}
export function getTokenExpiresDate() {
    return localStorage.getItem(APP_KEY + EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    removeAuthData,
    getTokenExpiresDate,
    getValue,
    removeValue,
    setValue
};
export default localStorageService;
