import { CloudDownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DiswikiApi from '../../services/DiswikiApi'
import Link from '@material-ui/core/Link';
const { Title } = Typography;

const Documents = () => {
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        getFiles();

    }, []);
    const getFiles = () => {
        DiswikiApi.getDocumentList()
            .then(res => {
                setTableData(res.data);
            }).catch(err => {
                console.log(err)
            })
    }
    const columns = [
        {
            title: 'Document_ID',
            dataIndex: 'id',
            key: 'Document_ID'
        },
        {
            title: 'Document',
            dataIndex: 'name',
            key: 'Document'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'Date'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'Status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) =>
                tableData.length >= 1 ?
                    getActionButton(record)
                    : null,
            key: 'Action'
        }
    ];

    const onDownload = (record) => {
        debugger
        DiswikiApi.donwloadDocument(record.name)
            .then(res => {
                debugger
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
    }
    const onView = (record) => {
        console.log(record)
    }
    const getActionButton = (record) => {
        return (
            <Row key={record.id + "rowAction"}>
                <Tooltip title="View"  >
                    <Button shape="circle" onClick={e => onView(record)} style={{ color: "green" }} icon={<EyeOutlined key={record.id + "view"} />} />
                </Tooltip>
                <Tooltip title="Download" style={{ marginLeft: "3rem" }}>
                    {/* <Button shape="circle" onClick={e => onDownload(record)} style={{ color: "red" }} icon={<CloudDownloadOutlined key={record.id + "download"} />} /> */}
                    {/* <Button shape="circle" style={{ color: "red" }} icon={<CloudDownloadOutlined key={record.id + "download"} />} >
                        <a href={`http://localhost:5000/api/file/download-document?file_name=${record.name}`}></a>
                    </Button> */}
                    <Link style={{ marginLeft: '1rem', marginTop: '0.4rem' }} href={`http://localhost:5000/api/file/download-document?file_name=${record.name}`} onClick={e => { }}>
                        <CloudDownloadOutlined key={record.id + "download"} />
                    </Link>
                </Tooltip>
            </Row>

        )
    }


    return (

        <div>

            <Row gutter={[40, 0]}>
                <Col span={23}>
                    <Title level={2}>
                        Documents
                    </Title>
                </Col>

            </Row>
            <Row gutter={[40, 0]}>
                <Col span={24}>
                    {tableData.length > 0 ? <Table columns={columns} dataSource={tableData} /> : <Title level={4}>
                        No Data
                    </Title>}
                </Col>
            </Row>
        </div>
    );
}

export default Documents;
