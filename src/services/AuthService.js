import axios from 'axios';
const API_HOST = process.env.REACT_APP_QA_API_URL;
class AuthService {

    login(username, password) {
        let body = { 'usernameOrEmail': username, 'password': password }
        return axios.post(`${API_HOST}user/signin`, body);
    }
}
export default new AuthService();