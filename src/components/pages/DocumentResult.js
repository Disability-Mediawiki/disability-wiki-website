import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Tooltip, Typography, Input, Popconfirm, Form, Modal } from 'antd';

import { useHistory } from 'react-router';
import axios from 'axios';
import { Menu, Dropdown } from 'antd';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import { DownOutlined } from '@ant-design/icons';

import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import EditableTable from '../layouts/TableLayout'
import DiswikiApi from '../../services/DiswikiApi'
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;
const { Title } = Typography;

const DocumentResult = () => {
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [glossaryTags, setGlossaryTag] = useState([]);
    const [trainingData, setTrainingData] = useState([]);
    const [tableDataEditLogs, setTableDataEditLog] = useState([]);
    const [selectedGlossary, setSelectedGlossary] = useState({});

    useEffect(() => {
        // getFiles();
        getDocumentList();
        // getFileResult('asd');
        getClassifiedResults('asd')
        getGlossaryList()


    }, []);


    const getDocumentList = () => {
        DiswikiApi.getDocumentListPending()
            .then(res => {
                setFileList(res.data)
            }).catch(err => {
                console.warn(err)
            })
    }

    const getGlossaryList = () => {
        DiswikiApi.getGlossaryListFlat()
            .then(res => {
                setGlossaryTag(res.data)
            }).catch(err => {
                console.warn(err)
            })
    }

    // const getActionButton = (key) => {
    //     return (
    //         <Row>
    //             <Tooltip title="Correct" >
    //                 <Button shape="circle" style={{ color: "green" }} icon={<CheckCircleOutlined />} />
    //             </Tooltip>
    //             <Tooltip title="Wrong" style={{ marginLeft: "3rem" }}>
    //                 <Button shape="circle" style={{ color: "red" }} icon={<CloseCircleOutlined />} />
    //             </Tooltip>
    //         </Row>

    //     )
    // }
    const getFileResult = (fileName) => {

        if (!fileName) return;
        axios.get(`http://localhost:5000/api/file/download`,
            // { params: { 'file_name': 'classified 2.csv' } })
            { params: { 'file_name': fileName } })
            .then(res => {
                let tbData = []
                if (res.status === 200) {
                    res.data.forEach((data, index) => {
                        tbData.push({
                            "tags": data.tag,
                            "paragraph": data.paragraph,
                            "key": index + "file_list"
                        })
                    })
                    setTableData(tbData);
                }
            })
            .catch(err => console.warn(err));
    }
    const getClassifiedResults = (fileName) => {
        if (!fileName) return;
        DiswikiApi.getClassificationResult('classified 2.csv')
            .then(res => {
                let tbData = []
                if (res.status === 200) {
                    res.data.forEach((data, index) => {
                        tbData.push({
                            "tags": data.tag,
                            "paragraph": data.paragraph,
                            "key": index + "glossary_data",
                            "id": data.id
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
                    <Menu.Item key={item.key + "file_list"} disabled={(item.status === 'processing')}>
                        {item.name}
                    </Menu.Item>
                )
            })
        }</Menu >)
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            key: 'DocumentResultTableID'
        },
        {
            title: 'Paragraph',
            dataIndex: 'paragraph',
            width: '60%',
            key: 'DocumentResultTable_Paragraph'
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            editable: false,
            key: 'DocumentResultTable_Tag',
            render: (_, record) =>
                tableData.length >= 0 && record.tags ? record.tags.map((tag, i) => {
                    return i < record.tags.length - 1 ?
                        (
                            <Chip
                                avatar={<Avatar>T</Avatar>}
                                label={tag.text}
                                key={i + "delelte_tag"}
                                clickable
                                color={(tag.new) ? "secondary" : 'primary'}
                                onDelete={e => handleTagDelete(record, tag)}
                                // deleteIcon={<DoneIcon />}
                                style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                            />) : (
                            <span>
                                <Chip
                                    avatar={<Avatar>T</Avatar>}
                                    label={tag.text}
                                    key={i + "delelte_two_tag"}
                                    clickable
                                    color={(tag.new) ? "secondary" : 'primary'}
                                    onDelete={e => handleTagDelete(record, tag)}
                                    // deleteIcon={<DoneIcon />}
                                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                                />,
                                <Chip

                                    label="Add Tag"
                                    key={i + "add_tag"}
                                    clickable
                                    icon={<AddBoxIcon />}
                                    variant="outlined"
                                    color="primary"
                                    onClick={e => handleTagAdd(record, tag)}
                                    // deleteIcon={<DoneIcon />}
                                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                                />
                            </span>
                        )

                }) : null,
        },
        {
            title: 'Action',
            key: 'DocumentResultTable_Action',
            dataIndex: 'operation',
            render: (_, record) =>
                tableData.length >= 0 ? (
                    <Popconfirm key={record.id + "delete_row_action"} title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                        <a>Delete Row</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    // TAG functions

    const handleTagDelete = (record, tag) => {
        debugger
        const dataSource = [...tableData];
        let index = dataSource.indexOf(record);
        dataSource[index].tags = dataSource[index].tags.filter((item) => item !== tag)
        setTableData(dataSource)
        if (tag.new) {
            let index = tableDataEditLogs.findIndex(elem => elem.type === "add_tag" && elem.row_id === record.id && elem.data === tag.text)
            tableDataEditLogs.splice(index, 1)
            setTableDataEditLog(tableDataEditLogs)
        } else {
            tableDataEditLogs.push({
                'type': 'delete_tag', 'row_id': selectedRow.id,
                'data': tag.text
            })
            setTableDataEditLog(tableDataEditLogs)
        }


    }
    const handleTagAdd = (record, tag) => {
        setModalVisible(true);
        setSelectedRow(record);
    }
    const handleDelete = (record) => {
        setTableData(tableData.filter((item) => item !== record))
        tableDataEditLogs.push({ 'type': 'delete_row', 'row_id': record.id })
        setTableDataEditLog(tableDataEditLogs)
    };
    const handleAdd = () => {
        // const { count, dataSource } = this.state;
        // const newData = {
        //     paragraph: `paragraph`,
        //     tags: ['tags']
        // };
        // this.setState({
        //     dataSource: [...dataSource, newData],
        //     count: count + 1,
        // });
    };
    const handleSave = (row) => {
        // const newData = [...this.state.dataSource];
        // const index = newData.findIndex((item) => row.key === item.key);
        // const item = newData[index];
        // newData.splice(index, 1, { ...item, ...row });
        // this.setState({
        //     dataSource: newData,
        // });
    };
    const handleTagNameChange = (e) => {
        setNewTagName(e.target.value)
    }
    const changeModalVisibleState = () => {
        setModalVisible(!isModalVisible)
    }
    const handleAddNewTagOk = () => {
        debugger
        setModalVisible(false)
        if (!newTagName) {
            return
        }
        const dataSource = tableData;
        let index = tableData.indexOf(selectedRow);
        if (newTagName.split("_").pop() === "@") {
            tableData[index].tags.push({ 'text': newTagName.split("_")[0], 'new': true })
            tableDataEditLogs.push({
                'type': 'add_tag', 'row_id': selectedRow.id,
                'data': newTagName.split("_")[0], 'id': selectedGlossary.id
            })
            setTableDataEditLog(tableDataEditLogs)
        }
        else {
            tableData[index].tags.push({ 'text': newTagName, 'new': true })
            trainingData.push({ "paragraph": selectedRow.paragraph, "tag": newTagName })
            tableDataEditLogs.push({ 'type': 'add_tag', 'row_id': selectedRow.id, 'data': newTagName })
            setTableDataEditLog(tableDataEditLogs)
            setTrainingData(trainingData);
        }
        setNewTagName('')
        setTableData(tableData);
    };

    const handleCancel = () => {
        setModalVisible(false)
    };

    const handleSearch = (value) => {
        setNewTagName(value)
    };
    //TAG FUNCTION

    const handleSaveEdit = (value) => {
        console.log(trainingData)
        console.log(tableDataEditLogs)

    }
    const handleGlossaryChange = (value, option) => {
        if (option && value.split("_").pop() === "@")
            setSelectedGlossary(option.glossary)
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
                <Col span={2}>
                    <Button
                        onClick={handleSaveEdit}
                        type="primary"
                        style={{
                            marginBottom: 16,
                        }}

                    >
                        Save Edits
                </Button>
                </Col>
            </Row>
            <Row gutter={[40, 0]}>
                <Col span={24}>
                    <Table
                        pagination={{ pageSize: 2 }}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={tableData}
                        columns={columns}
                    />
                    {/* <Modal title="Add new tag" visible={isModalVisible} onOk={handleAddNewTagOk} onCancel={handleCancel}>
                        <TextField name="tag-name" label="Tag name" variant="outlined" value={newTagName} onChange={handleTagNameChange} style={{ width: '100%' }} />
                    </Modal> */}
                    <Modal title="Add new tag" visible={isModalVisible} onOk={handleAddNewTagOk} onCancel={handleCancel}>

                        <AutoComplete style={{ width: '100%' }} onSearch={handleSearch}
                            allowClear
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            onChange={handleSearch}
                            onSelect={handleGlossaryChange}
                            placeholder="input here">
                            {glossaryTags.map((glossary, i) => (
                                <Option key={i + "glossary_list"} glossary={glossary} value={glossary.label + "_@"}>
                                    {glossary.label}
                                </Option>
                            ))}
                        </AutoComplete>
                    </Modal>
                </Col>
            </Row>
        </div>
    );
}

export default DocumentResult;
