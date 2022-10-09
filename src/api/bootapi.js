import axios from "axios"

const baseURL = "http://localhost:8080"
let token = localStorage.getItem('jwtToken');

const axiosObject = axios.create({
    base_url: baseURL, 
})

axiosObject.interceptors.request.use(config => {
    if(token){
        token = token.replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
    }else{
        console.log("something went wrong");
    }
    return config;
}, error => {
    return Promise.reject(error);
})

export default axiosObject;
