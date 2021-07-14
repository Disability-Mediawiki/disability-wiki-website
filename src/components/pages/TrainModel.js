import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
    Link as Routinglink
} from "react-router-dom";
import { CloudDownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Tooltip, Typography, message, Divider } from 'antd';
import DiswikiApi from '../../services/DiswikiApi'
import Link from '@material-ui/core/Link';
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
const TrainModel = () => {
    const classes = useStyles();
    const history = useHistory();
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        getTrainingData();

    }, []);
    const getTrainingData = () => {
        DiswikiApi.getTrainginData()
            .then(res => {
                setTableData(res.data);
            }).catch(err => {
                message.error({
                    content: 'Internal error : ' + err,
                    className: 'custom-class',
                    style: {
                        marginTop: '4vh',
                    },
                })
            })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id_title_key'
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag_title_key'
        },
        {
            title: 'Paragraph',
            dataIndex: 'paragraph',
            key: 'paragraph_title_key'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status_title_key'
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            // disabled: record.status === 'Failed',
            // name: record.label,
        }),
    };

    return (
        <div>
            <Row>
                <Col xs={24} xl={4}>
                    <Title level={2}>
                        Training Data
                    </Title>
                </Col>
            </Row>
            <Row>
                <Col xs={24} xl={2}>
                    <Button
                        shape="round"
                        style={{
                            marginBottom: 16,
                        }}

                    >
                        Train
                    </Button>
                </Col>
                <Col xs={24} xl={4}>
                    <Button danger shape="round" size={'default'}>
                        Remove selected
                    </Button>
                </Col>
                <Col xs={24} xl={18}>
                </Col>
            </Row>

            <Divider />
            <Row >
                <Col xs={24} xl={24}>
                    {tableData.length > 0 ? <Table rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                        columns={columns}
                        dataSource={tableData} /> :
                        <Title level={4}>
                            No Data
                        </Title>}
                </Col>
            </Row>

        </div>
    );
}

export default TrainModel;
