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
    fileUpload(formData) {
        const config = {

            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            }
        }
        return axios.post(`http://localhost:5000/api/file/upload`, formData,
            // config
        )

    }
    getClassificationResult(fileName) {
        return axios.get(`http://localhost:5000/api/file/download`,
            { params: { 'file_name': fileName } })
    }
    getClassificationResult(fileName) {
        return axios.get(`http://localhost:5000/api/file/download`,
            { params: { 'file_name': fileName } })
    }

}

export default new DiswikiApi();