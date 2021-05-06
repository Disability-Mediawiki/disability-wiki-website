import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import DiswikiApi from '../../services/DiswikiApi'
const { Dragger } = Upload;
const FileUpload = (props) => {
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
    });
    const handleUpload = () => {
        debugger
        const formData = new FormData();
        // fileList.forEach(file => {
        //     formData.append('files[]', file);
        // });
        formData.append('file', fileList[0]);

        setUploading(true)
        debugger
        DiswikiApi.fileUpload(formData)
            .then(res => {
                debugger
                setUploading(false)
                message.success(`${res.data.filename} file uploaded successfully`);
                fileList.pop()
                setFileList(fileList)
            })
            .catch(err => {
                console.log(err)
                setUploading(false)
                debugger
            })
    };
    const uploadProps = {
        onRemove: file => {

            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList)
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file])
            return false
        },
        fileList,

    };
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
