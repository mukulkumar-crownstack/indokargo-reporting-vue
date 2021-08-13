import API_CONSTANTS from "../Constants/API";

export function getStoredItems(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setItemInLocalStorage(key, value) {
    console.log(key, value)
    localStorage.setItem(key, JSON.stringify(value));
}

export function clearLocalStorage() {
    localStorage.clear();
}

export function isLoggedIn() {
    return localStorage.getItem(API_CONSTANTS.indokargo) ? true : false;
}