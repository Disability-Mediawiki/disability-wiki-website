import axios from 'axios';
// import './DisWikiConfig.js'

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
                // 'Content-Type': 'multipart/form-data',
                // 'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.post(`http://localhost:5000/api/file/upload`, formData,
            config
        )

    }
    getClassificationResult(fileName) {
        return axios.get(`http://localhost:5000/api/file/download`,
            { params: { 'file_name': fileName } })
    }
    getDocumentList() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}file/get-all-document`, { config })
    }
    getDocumentListPending() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}file/get-pending-document`, { config })
    }
    donwloadDocument(fileName) {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}file/download-document`, { params: { 'file_name': fileName } })
    }
    getGlossaryListFlat() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}glossary/get-all-flat`, { config })
    }
}

export default new DiswikiApi();