import axios from "axios";
import envirolment from "../envirolments/envirolment";
import { API_RESPONSE } from "../core/interface/user.interface";

const access_token = localStorage.getItem(envirolment.TOKEN_KEY);
const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': access_token ? `Bearer ${access_token}` : "",
}


const axiosInstance = axios.create({
    baseURL: envirolment.API_URL,
    headers: defaultHeaders
});

// Optionally add request/response interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return error;
    }
);

axiosInstance.interceptors.response.use(
    (response:API_RESPONSE) => {
        return {...response.data};
    },
    (error) => {
        window.location.href = "/";
        console.log(error)
        return error;
    }
);

export default axiosInstance;
