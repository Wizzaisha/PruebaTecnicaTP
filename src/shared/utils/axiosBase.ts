import axios from "axios";
import { getEnvVariables } from "./getEnvVariables";

const { apiUrl, apiKey } = getEnvVariables();
const axiosBase = axios.create({
    baseURL: `${apiUrl}/${apiKey}/`,
    headers: { "Content-Type": "application/json" },
});

export default axiosBase;