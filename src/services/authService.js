import API_CONSTANTS from "../Constants/API";
import axios from "axios";
import { setItemInLocalStorage, clearLocalStorage } from './localStorage'

export function loginService(data) {
    return axios.post(API_CONSTANTS.LOGIN, data).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            let customer;
            if (response.data.data[0].profile.role === 'asset_user') {
                customer = (response && response.data.data && response.data.data[0] && response.data.data[0].profile && response.data.data[0].profile.primary_login === 'phone' ? response && response.data.data && response.data.data[0] && response.data.data[0].profile && response.data.data[0].profile.phone : response && response.data.data && response.data.data[0] && response.data.data[0].profile && response.data.data[0].profile.email)
            } else {
                customer = (response && response.data.data && response.data.data[0] && response.data.data[0].profile && response.data.data[0].profile.customer && response.data.data[0].profile.customer.company);
                customer = customer.split(' ').join('_')
            }
            setItemInLocalStorage(API_CONSTANTS.indokargo, response.data.data[0]);
            setItemInLocalStorage(API_CONSTANTS.indokargoCustomer, customer);
            return { status: response.data.status };
        }
    });
}

export function logoutService() {
    return axios.get(API_CONSTANTS.LOGOUT).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            clearLocalStorage();
            return { status: response.data.status };
        }
    });
}