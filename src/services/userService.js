import axios from "axios";

import API_CONSTANTS from "../Constants/API";

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