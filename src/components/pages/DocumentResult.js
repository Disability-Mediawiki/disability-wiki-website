import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Tooltip, Typography, Input, Popconfirm, Form } from 'antd';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import EditableTable from '../layouts/TableLayout'

const { Title } = Typography;

const DocumentResult = () => {
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        getFiles();
        // getFileResult('asd');

    }, []);

    const tableColumns = [
        {
            title: 'Paragraph',
            dataIndex: 'paragraph',
            width: '60%',
            editable: true,
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            editable: true,
        },
        {
            title: 'Object',
            dataIndex: 'address',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) =>
                tableData.length == 0 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

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
            title: 'Label',
            dataIndex: 'label',
        },
        {
            title: 'Paragraph',
            dataIndex: 'paragraph'
        },
        {
            title: 'Feedback',
            dataIndex: 'action'
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
                <Tooltip title="Correct" >
                    <Button shape="circle" style={{ color: "green" }} icon={<CheckCircleOutlined />} />
                </Tooltip>
                <Tooltip title="Wrong" style={{ marginLeft: "3rem" }}>
                    <Button shape="circle" style={{ color: "red" }} icon={<CloseCircleOutlined />} />
                </Tooltip>
            </Row>

        )
    }
    const getFileResult = (fileName) => {
        debugger
        if (!fileName) return;
        axios.get(`http://localhost:5000/api/file/download`,
            { params: { 'file_name': 'classified 2.csv' } })
            .then(res => {
                let tbData = []
                if (res.status === 200) {
                    res.data.forEach(data => {
                        tbData.push({
                            "tags": data.tag,
                            "paragraph": data.paragraph,
                            // "action": getActionButton(key)
                        })
                    })
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
                        Results
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
            {/* <Row gutter={[40, 0]}>
                <Col span={24}>
                    <Table columns={columns} dataSource={tableData} />
                </Col>
            </Row> */}
            <Row gutter={[40, 0]}>
                <Col span={24}>
                    <EditableTable columns={tableColumns} tableData={tableData} />
                </Col>
            </Row>
        </div>
    );
}

export default DocumentResult;
