import axios from "axios";
import { API_BASE_URL } from "./ApiConstant";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
