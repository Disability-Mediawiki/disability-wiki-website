/*
DOCUMENT COMPONENT
VIEW OR DOWNLOAD ALL UPLOADED DOCUMENST AND IT'S STATUS
*/

import { CloudDownloadOutlined, EyeOutlined } from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Col, Empty, message, Modal, Row, Skeleton, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DiswikiApi from '../../services/DiswikiApi';
import PdfViewer from '../layouts/PdfViewer';

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
    const [tableLoading, setTableLoading] = useState(false);
    useEffect(() => {
        getFiles();

    }, []);
    const getFiles = () => {
        setTableLoading(true);
        DiswikiApi.getDocumentList()
            .then(res => {
                setTableData(res.data);
                setTableLoading(false);
            }).catch(err => {
                console.log(err)
                message.error({
                    content: 'Error : Please try again later',
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                })
                setTableLoading(false);
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
        setSelectedFile(record)
        setModalVisible(true)
    }
    const getActionButton = (record) => {
        return (
            <Row key={record.id + "rowAction"}>
                <Tooltip title="View"  >
                    <Button shape="circle"
                        aria-label={`view document ${record.name}`}
                        onClick={e => onView(record)} style={{ color: "green" }} icon={<EyeOutlined key={record.id + "view"} />} />
                </Tooltip>
                <Tooltip title="Download"   >
                    <Button shape="circle"
                        aria-label={`download document ${record.name}`}
                        onClick={e =>
                            window.location.href = `${API_HOST}file/download-document?file_name=${record.name}`}
                        style={{ color: "blue", marginLeft: "1rem" }} icon={<CloudDownloadOutlined key={record.id + "download"} />} />
                </Tooltip>
            </Row>

        )
    }

    return (
        <div>
            <Row gutter={[40, 0]}>
                <Col span={23}>
                    <Title level={2} aria-label="Documents page">
                        Documents
                    </Title>
                </Col>
            </Row>
            <Row gutter={[40, 0]}>
                <Col span={24}>
                    <Table aria-label="documents table" columns={columns} dataSource={tableData} locale={{
                        emptyText: tableLoading ? <Skeleton active={true} /> : tableData.length > 0 ? <Empty /> : <Title level={4}>
                            No Data
                        </Title>
                    }} />
                </Col>
            </Row>
            <div>
                <Modal
                    title="Document"
                    centered
                    aria-label="document viewer popup dialog"
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
