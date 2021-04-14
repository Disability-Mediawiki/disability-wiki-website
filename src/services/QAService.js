import axios from 'axios';
import './QAConfig.js'
const API_HOST = process.env.REACT_APP_QA_API_URL;
class QAService {

    login(username, password) {
        let body = { 'usernameOrEmail': username, 'password': password }
        return axios.post(`${API_HOST}user/signin`, body);
    }
    query(question, token) {
        let token2 = JSON.parse(window.sessionStorage.getItem('user-config')).accessToken
        const config = {
            headers: { 'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4NTEiLCJpYXQiOjE2M…-r-_Zwxdz34D79XY1EEvCNskhBYKIg4-pAfHM0C6hCX6ht6fA` }
        };
        let params = {
            'kb': 'test',
            'lang': 'en',
            'question': question,
            'user': window.sessionStorage.getItem('user-name')
        };
        // return axios.get(`${API_HOST}qa/full`, {
        //     params: params,
        //     headers: { "Authorization": `Bearer ${token2}` }
        // });
        return axios.get(`${API_HOST}qa/full`, {
            params: params
        });

    }
    autocomplete(question) {
        let token = JSON.parse(window.sessionStorage.getItem('user-config')).accessToken
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let params = {
            'kb': 'test',
            'lang': 'en',
            'prefix': question,
            'size': 5,
            'user': window.sessionStorage.getItem('user-name')
        };
        return axios.get(`${API_HOST}autocomplete`, {
            params: params,
            config
            // headers: { 'Authorization': token }
        });
    }

}

export default new QAService();