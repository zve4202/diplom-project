const APP_KEY = "music-shop-";

const STAYON_KEY = "jwt-stay-on";
const TOKEN_KEY = "jwt-base-active";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

function stayOn() {
    const stayOn = localStorage.getItem(APP_KEY + STAYON_KEY);
    return stayOn && stayOn === "true";
}

export function getValue(key) {
    if (stayOn()) {
        return localStorage.getItem(APP_KEY + key);
    } else {
        return sessionStorage.getItem(APP_KEY + key);
    }
}
export function removeValue(key) {
    if (stayOn()) {
        localStorage.removeItem(APP_KEY + key);
    } else {
        sessionStorage.removeItem(APP_KEY + key);
    }
}
export function setValue(key, value) {
    if (stayOn()) {
        localStorage.setItem(APP_KEY + key, value);
    } else {
        sessionStorage.setItem(APP_KEY + key, value);
    }
}
export function setTokens({
    stayOn,
    refreshToken,
    accessToken,
    expiresIn = 3600
}) {
    localStorage.setItem(APP_KEY + STAYON_KEY, stayOn);
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    if (stayOn) {
        localStorage.setItem(APP_KEY + TOKEN_KEY, accessToken);
        localStorage.setItem(APP_KEY + REFRESH_KEY, refreshToken);
        localStorage.setItem(APP_KEY + EXPIRES_KEY, expiresDate);
    } else {
        sessionStorage.setItem(APP_KEY + TOKEN_KEY, accessToken);
        sessionStorage.setItem(APP_KEY + REFRESH_KEY, refreshToken);
        sessionStorage.setItem(APP_KEY + EXPIRES_KEY, expiresDate);
    }
}
export function getAccessToken() {
    if (stayOn()) {
        return localStorage.getItem(APP_KEY + TOKEN_KEY);
    } else {
        return sessionStorage.getItem(APP_KEY + TOKEN_KEY);
    }
}
export function getRefreshToken() {
    if (stayOn()) {
        return localStorage.getItem(APP_KEY + REFRESH_KEY);
    } else {
        return sessionStorage.getItem(APP_KEY + REFRESH_KEY);
    }
}
export function removeAuthData() {
    if (stayOn()) {
        localStorage.removeItem(APP_KEY + STAYON_KEY);
        localStorage.removeItem(APP_KEY + TOKEN_KEY);
        localStorage.removeItem(APP_KEY + REFRESH_KEY);
        localStorage.removeItem(APP_KEY + EXPIRES_KEY);
    } else {
        sessionStorage.removeItem(APP_KEY + TOKEN_KEY);
        sessionStorage.removeItem(APP_KEY + REFRESH_KEY);
        sessionStorage.removeItem(APP_KEY + EXPIRES_KEY);
    }
}
export function getTokenExpiresDate() {
    if (stayOn()) {
        return localStorage.getItem(APP_KEY + EXPIRES_KEY);
    } else {
        return sessionStorage.getItem(APP_KEY + EXPIRES_KEY);
    }
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
