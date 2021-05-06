import axios from 'axios';
const API_HOST_QA = process.env.REACT_APP_QA_API_URL;
const API_HOST_DIS_WIKI = process.env.REACT_APP_DISWIKI_API_URL;
class AuthService {

    login(username, password) {
        let body = { 'usernameOrEmail': username, 'password': password }
        return axios.post(`${API_HOST_QA}user/signin`, body);
    }
    login_dis_wiki(email, password) {
        let body = { 'email': email, 'password': password }
        return axios.post(`${API_HOST_DIS_WIKI}user/login`, body);
    }
}
export default new AuthService();