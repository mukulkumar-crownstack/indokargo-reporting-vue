import axios from 'axios';
import API_CONSTANTS from '../Constants/API';
import { getStoredItems } from "../services/localStorage";

export default function setup() {
    axios.interceptors.request.use(function (config) {
        const currentUser = getStoredItems(API_CONSTANTS.indokargo);
        if (currentUser && currentUser.session) {
            config.headers.Session = `${currentUser.session.session_id}`;
        }
        config.headers.oauth = API_CONSTANTS.OAUTH_TOKEN;
        config.headers['Content-Type'] = 'application/json';
        config.headers.Accept = 'application/json';
        return config;
    }, function (err) {
        return Promise.reject(err);
    });
}