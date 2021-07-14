import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
    Link as Routinglink
} from "react-router-dom";
import { CloudDownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Tooltip, Typography, Modal } from 'antd';
import DiswikiApi from '../../services/DiswikiApi'
import Link from '@material-ui/core/Link';
import PdfViewer from '../layouts/PdfViewer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const { Title } = Typography;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const API_HOST = process.env.REACT_APP_LOCAL_API_URL;
const Documents = () => {
    const classes = useStyles();
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        getFiles();

    }, []);
    const getFiles = () => {
        DiswikiApi.getDocumentList()
            .then(res => {
                setTableData(res.data);
            }).catch(err => {
                debugger
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

        DiswikiApi.donwloadDocument(record.name)
            .then(res => {

                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
    }
    const onView = (record) => {
        debugger
        setSelectedFile(record)
        setModalVisible(true)
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
                    <Link style={{ marginLeft: '1rem', marginTop: '0.4rem' }} href={`${API_HOST}file/download-document?file_name=${record.name}`} onClick={e => { }} target="_blank"  >
                        <CloudDownloadOutlined key={record.id + "download"} />
                    </Link>
                    {/* <Routinglink style={{ marginLeft: '1rem', marginTop: '0.4rem' }} to={`http://localhost:5000/api/file/download-document?file_name=${record.name}`} target="_blank"><CloudDownloadOutlined key={record.id + "download"} /></Routinglink> */}
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
            <div>
                <Modal
                    title="Document"
                    centered
                    visible={modalVisible}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                    width={800}
                    height={600}
                >
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <PdfViewer file_name={selectedFile.name} />
                                </Paper>
                            </Grid>
                        </Grid>

                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Documents;
