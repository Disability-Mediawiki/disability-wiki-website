import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Dragger } = Upload;
const UploadFile = () => {

    useEffect(() => {
    });

    const props = {
        // beforeUpload: (file: any) => {
        //     if (file.type !== 'image/png') {
        //         message.error(`${file.name} is not a png file`);
        //     }
        //     return file.type === 'image/png' ? true : false
        // },
        name: 'file',
        action: 'http://localhost:8080/api/file/upload',

        // headers: {
        //     authorization: 'authorization-text'
        // },
        // customRequest(file: any) {
        //     // axios.post(`http://localhost:8080/api/file`, file, {
        //     //     headers: { 'Content-Type': 'multipart/form-data' }
        //     // })
        //     // .then((res: any) => {
        //     //     debugger
        //     // })
        //     // .catch((err: any) => {
        //     //     debugger
        //     // });

        //     const data = new FormData()
        //     data.append('file', file)
        //     axios.post("http://localhost:8080/api/file", data, {
        //         // receive two    parameter endpoint url ,form data
        //     })
        //         .then((res: any) => {
        //             debugger
        //         })
        //         .catch((err: any) => {
        //             debugger
        //         });

        // },
        onChange(info) {
            debugger
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                debugger
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                debugger
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div>
            {/* <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>, */}
            <Dragger {...props}>
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
        </div>
    );
}

export default UploadFile;
