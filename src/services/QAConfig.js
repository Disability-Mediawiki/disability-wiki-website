import axios from 'axios';
//  const instance = axios.create({
//     // baseURL: 'https://some-domain.com/api/',
//     timeout: 2000,
//     // headers: { 'Authorization': 'Bearer ' + token }
// });
axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        config.headers["Authorization"] = `Bearer ${JSON.parse(window.sessionStorage.getItem('user-config')).accessToken}`;
        return config;
    },
    error => {
        Promise.reject(error);
    }
);
