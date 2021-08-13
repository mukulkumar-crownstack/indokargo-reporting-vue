export default class API_CONSTANTS {
    static BASE_URL = 'http://dev.indokargo.api-build-release.com/v1';

    static OAUTH_TOKEN = `4f7a94f9cf36efa1b5d4167106d76023154704ea1d4035e874z1ae06f956dhd9`;
    static indokargo = 'Indokargo-reports';
    static indokargoCustomer = 'Indokargo-customer';

    static LOGIN = `${API_CONSTANTS.BASE_URL}/user/login`;
    static LOGOUT = `${API_CONSTANTS.BASE_URL}/user/logout`;
    static GET_COUNTRIES = `${API_CONSTANTS.BASE_URL}/countries`;
    static GET_CITY = `${API_CONSTANTS.BASE_URL}/cities`;
    static GET_LOCATIONS = `${API_CONSTANTS.BASE_URL}/customer/asset-report/locations`;
    static GET_ASSET_USER = `${API_CONSTANTS.BASE_URL}/customer/asset-user`;
    static GET_LOCATION = `${API_CONSTANTS.BASE_URL}/customer/address`;
    static GET_LOCATION_QR = `${API_CONSTANTS.BASE_URL}/customer/asset-report/qrcode`;
    static GET_LOCATION_QR_MOVEMENT = `${API_CONSTANTS.BASE_URL}/customer/asset-report/store`;
    static GET_ASSET_REPORT_SUMMARY = `${API_CONSTANTS.BASE_URL}/customer/asset-report/summary`;
    static GET_REGION = `${API_CONSTANTS.BASE_URL}/region`;
    static GET_ACTIVE_JOBS = `${API_CONSTANTS.BASE_URL}/customer/asset-report/qr-jobs`;
    static EXPORT_ACTIVE_JOBS = `${API_CONSTANTS.BASE_URL}/customer/asset-report/qr-jobs/export`;
    static EXPORT_LOCATIONS = `${API_CONSTANTS.BASE_URL}/customer/asset-location`;
}