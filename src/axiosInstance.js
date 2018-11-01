import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://206.189.137.234:3000/'
})

export default axiosInstance;
