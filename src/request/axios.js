import axios from "axios";
const config = import.meta.env

const instance = axios.create({
    baseURL: `http://${config.VITE_HOST}:${config.VITE_PORT_BACKEND}`,
    withCredentials: true
})

export default instance
