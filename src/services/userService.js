import axios from "axios";

import API_CONSTANTS from "../Constants/API";
import { getStoredItems } from "./localStorage";

export function getLocationsService() {
    return axios.get(API_CONSTANTS.GET_LOCATIONS).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function getLocationSummary() {
    return axios.get(API_CONSTANTS.GET_LOCATIONS_SUMMARY).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function getCountryList() {
    return axios.get(API_CONSTANTS.GET_COUNTRIES).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function getRegionList() {
    const params = {
        customer_uid: getStoredItems(API_CONSTANTS.indokargo).profile.customer.uid
    };
    return axios.get(API_CONSTANTS.GET_REGION, { params: params }).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function getLocation(params) {
    return axios.get(API_CONSTANTS.GET_LOCATIONS, { params: params }).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function getAssetCodeList(asset_id, params) {
    return axios.get(`${API_CONSTANTS.GET_LOCATION_QR}/${asset_id}`, { params: params }).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function getStoreList(asset_id, params) {
    return axios.get(`${API_CONSTANTS.GET_LOCATION_QR_MOVEMENT}/${asset_id}`, { params: params }).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function getLocationById(id) {
    return axios.get(`${API_CONSTANTS.GET_LOCATION}/${id}`).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function getCity(id) {
    return axios.get(`${API_CONSTANTS.GET_CITY}?state_id=${id}`).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function getActiveMovementJobsList(params) {
    return axios.get(`${API_CONSTANTS.GET_ACTIVE_JOBS}`, { params: params }).then((response) => {
        if (response.data.status === "Failure") {
            return response.data.data.error_message;
        }
        if (response.data.status === "Success") {
            return { data: response.data.data };
        }
    });
}

export function exportLocations(params) {
    return axios.get(`${API_CONSTANTS.EXPORT_LOCATIONS}`, { params: params, responseType: 'blob' }).then((response) => {
        return response;
    });
}

export function exportJobs(params) {
    return axios.get(`${API_CONSTANTS.EXPORT_ACTIVE_JOBS}`, { params: params, responseType: 'blob' }).then((response) => {
        return response;
    });
}