import React, { useEffect, useState } from 'react';
import { Col, Row, Empty } from 'antd';
import { Upload, message, Button, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import DiswikiApi from '../../services/DiswikiApi'
import country from '../../data/country.json'
const { Dragger } = Upload;
const { Option } = Select;
const FileUpload = (props) => {
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState('')
    const [documentName, setDocumentName] = useState('')
    const [countryList, setCountryList] = useState([])

    useEffect(() => {
        getCountryList();
    });

    const getCountryList = () => {
        // DiswikiApi.getDocumentList()
        //     .then(res => {
        //         setTableData(res.data);
        //     }).catch(err => {
        //         console.log(err)
        //     })
        setCountryList(country);
    }
    const handleUpload = () => {
        debugger
        const formData = new FormData();
        // fileList.forEach(file => {
        //     formData.append('files[]', file);
        // });
        let file = fileList[0]
        formData.append('file', file);
        formData.append('document_name', documentName);
        formData.append('country', selectedCountry);

        setUploading(true)
        DiswikiApi.fileUpload(formData)
            .then(res => {
                setUploading(false)
                message.success(`${res.data.filename} file uploaded successfully`);
                fileList.pop()
                setFileList([])
                setDocumentName('')
            })
            .catch(err => {
                console.log(err)
                setUploading(false)
            })
    };
    const onChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedCountry(value)
    }

    const onBlur = () => {
        console.log('blur');
    }

    const onFocus = () => {
        console.log('focus');
    }

    const onSearch = (val) => {
        console.log('search:', val);
    }

    const uploadProps = {
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList)
            setDocumentName('')
        },
        beforeUpload: (file) => {
            // setFileList([...fileList, file])
            setFileList([file])
            setDocumentName(file.name.split('.')[0])
            return false
        },
        fileList,

    };

    const renderCountryOption = () => {
        if (countryList.length > 0)
            countryList.map((country, index) => {
                return (<Option key={country.Code} value={country.Code}>{country.Name}</Option>)
            })

    }
    const documentNameOnChange = (e) => {
        debugger
        setDocumentName(e.target.value)
    }
    return (
        <div>
            {/* <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>, */}
            <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Upload the document that needs to be classified by our classifier
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
            <div style={{ marginTop: 16, width: '50%', marginLeft: '20%' }}>
                <Input addonBefore="Document Name" value={documentName} onChange={documentNameOnChange} defaultValue="Name" disabled />
            </div>
            <div style={{ marginBottom: 16, marginTop: 16, }}>
                <Row>
                    <Col span={4}>
                    </Col>
                    <Col span={3}>
                        <p className="ant-text">Country</p>
                    </Col>
                    <Col span={10}>
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Country"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                (countryList.length > 0) ?
                                    countryList.map((country, index) => (
                                        <Option key={country.Code} value={country.Code}>{country.Name}</Option>
                                    )) : null
                            }
                        </Select>
                    </Col>
                </Row>


            </div>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
        </div>
    );
}

export default FileUpload;
