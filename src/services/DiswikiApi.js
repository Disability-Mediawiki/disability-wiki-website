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
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }
        return axios.get(`${API_HOST}doc-classifiy/download`,
            {
                params: { 'file_name': fileName }, headers
            })
        // axios.get(`http://localhost:5000/api/file/get-document-result`,
        //     // { params: { 'file_name': 'classified 2.csv' } })
        //     { params: { 'document_id': id } })
    }
    getDocumentList() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}file/get-all-document`, config)
    }

    getDocumentListPending() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}file/get-pending-document`, config)
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
    updateCLassificationEdit(payload) {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.post(`${API_HOST}doc-classifiy/update`, payload, config)
    }

    //WIKI EDIT API 
    uploadWikiEditRequest(document) {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        const payload = {
            'document': document
        }
        return axios.post(`${API_HOST}request/upload-wikiedit`, payload, config)
    }
    getAllPendingWikiEditRequest() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}request/get-pending-request`, config)
    }
    getClassificationViewResult(doc_name) {
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }
        return axios.get(`${API_HOST}doc-classifiy/view-result`,
            {
                params: { 'file_name': doc_name }, headers
            })
    }
    updateUploadRequest(payload) {
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }
        return axios.get(`${API_HOST}request/request-verify`,
            {
                params: payload, headers
            })
    }
}

export default new DiswikiApi();