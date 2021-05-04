import axios from 'axios';
const API_HOST = process.env.REACT_APP_DISWIKI_API_URL;
class DiswikiApi {

    test(keyword) {
        let params = {
            'keyword': keyword
        };
        return axios.get(`${API_HOST}wikibase/search`, {
            params: params
        })

    }

}

export default new DiswikiApi();