import axios from 'axios';

const customInstance = () => {
    const instance = axios.create({
        timeout: 150000,
    });

    instance.interceptors.request.use((config) => {
        // console.log("🚀 ~ file: axios.js ~ line 13 ~ config", config)
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    
    instance.interceptors.response.use((response) => {
        // console.log("🚀 ~ file: axios.js ~ line 24 ~ response", response)
        return response;
    }, (error) => {
        console.log(error)
    });

    return instance;
}

export default customInstance;