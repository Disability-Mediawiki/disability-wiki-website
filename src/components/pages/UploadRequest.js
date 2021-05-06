import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Tooltip, Typography } from 'antd';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Menu, Dropdown, Popconfirm } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import EditableTable from '../layouts/TableLayout'

const { Title } = Typography;

const UploadRequest = () => {
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        getFiles();
        setTableData([
            {
                'username': 'testUser',
                'filename': 'convention.pdf',
                'datetime': '04/22/2021+GMT3:00',
                'status': 'pending',
            },
            {
                'username': 'testUser',
                'filename': 'convention.pdf',
                'datetime': '04/22/2021+GMT3:00',
                'status': 'pending',
            },

        ])
    }, []);
    const getFiles = () => {
        axios.get(`http://localhost:8080/api/file/list`)
            .then(response => {
                debugger
                console.log(response.data)
                setFileList(response.data)
            })
            .catch(err => console.warn(err));
    }
    const columns = [
        {
            title: 'UserName',
            dataIndex: 'username',
            editable: true,
        },
        {
            title: 'File Name',
            dataIndex: 'filename'
        },
        {
            title: 'Uploaded time',
            dataIndex: 'datetime'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            // render: (_, record) =>
            //     tableData.length >= 1 ? (
            //         <div>

            //             <Popconfirm style={{ marginLeft: '1rem' }} title="Sure to delete?" onConfirm={() => console.log(record)}>
            //                 <a>Aprove</a>
            //             </Popconfirm>
            //             <Popconfirm title="Sure to delete?" onConfirm={() => console.log(record)}>
            //                 <a>Delete</a>
            //             </Popconfirm>

            //         </div>
            //     ) : null,
            render: (_, record) =>
                tableData.length >= 1 ?
                    getActionButton(record)
                    : null,
        }
    ];



    const data = [{
    }];

    allData.map((user) => {
        data.push({
            key: user.id,
            username: user.username,
            email: user.email,
            gender: user.gender,
            review: user.review + '%',
        })
        return data;
    });
    const getActionButton = (key) => {
        return (
            <Row>
                <Tooltip title="Approve" >
                    <Button shape="circle" style={{ color: "green" }} icon={<CheckCircleOutlined />} />
                </Tooltip>
                <Tooltip title="Delete" style={{ marginLeft: "3rem" }}>
                    <Button shape="circle" style={{ color: "red" }} icon={<CloseCircleOutlined />} />
                </Tooltip>
            </Row>

        )
    }

    const getFileResult = (fileName) => {
        if (!fileName) return;
        axios.get(`http://localhost:8080/api/file/download`,
            { params: { 'fileName': fileName } })
            .then(res => {
                let tbData = []
                if (res.status === 200) {
                    for (let key in res.data.result) {
                        tbData.push({
                            "label": res.data.result[key].join(),
                            "paragraph": key,
                            "action": getActionButton(key)
                        })
                    }
                    setTableData(tbData);
                }
            })
            .catch(err => console.warn(err));
    }
    const handleClick = () => {
        history.push('/form')
    }
    function handleFileClick(e) {

        getFileResult(fileList[e.key])
    }

    const getFileList = () => {
        return (< Menu onClick={handleFileClick} >{
            fileList.map((item, index) => {
                return (
                    <Menu.Item key={index}>
                        {item}
                    </Menu.Item>
                )
            })
        }</Menu >)

    }
    return (

        <div>

            <Row gutter={[40, 0]}>
                <Col span={20}>
                    <Title level={2}>
                        Upload Request
                    </Title>
                </Col>
                <Col span={2}>
                    {/* <Button onClick={handleClick} block>Add User</Button> */}
                    <Dropdown.Button overlay={getFileList} trigger={['click']} >
                        <a className="ant-dropdown-link" onClick={e => handleFileClick(e)}>
                            Select file <DownOutlined />
                        </a>
                    </Dropdown.Button>
                </Col>
            </Row>
            <Row gutter={[40, 0]}>
                <Col span={24}>
                    <Table columns={columns} dataSource={tableData} />
                </Col>
            </Row>
        </div>
    );
}

export default UploadRequest;
