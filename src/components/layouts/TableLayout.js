import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, Badge, Card, Modal } from 'antd';
import DiswikiApi from '../../services/DiswikiApi'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Paragraph',
                dataIndex: 'paragraph',
                width: '60%',
                editable: true,
            },
            {
                title: 'Tags',
                dataIndex: 'tags',
                editable: false,
                render: (_, record) =>
                    this.state.dataSource.length >= 0 && record.tags ? record.tags.map((tag, i) => {
                        return i < record.tags.length - 1 ?
                            (
                                <Chip
                                    avatar={<Avatar>T</Avatar>}
                                    label={tag.text}
                                    key={i}
                                    clickable
                                    color={(tag.new) ? "secondary" : 'primary'}
                                    onDelete={e => this.handleTagDelete(record, tag)}
                                    // deleteIcon={<DoneIcon />}
                                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                                />) : (
                                <span>
                                    <Chip
                                        avatar={<Avatar>T</Avatar>}
                                        label={tag.text}
                                        key={i}
                                        clickable
                                        color={(tag.new) ? "secondary" : 'primary'}
                                        onDelete={e => this.handleTagDelete(record, tag)}
                                        // deleteIcon={<DoneIcon />}
                                        style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                                    />,
                                    <Chip

                                        label="Add Tag"
                                        key={i}
                                        clickable
                                        icon={<AddBoxIcon />}
                                        variant="outlined"
                                        color="primary"
                                        onClick={e => this.handleTagAdd(record, tag)}
                                        // deleteIcon={<DoneIcon />}
                                        style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                                    />
                                </span>
                            )

                    }) : null,
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                render: (_, record) =>
                    this.state.dataSource.length >= 0 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                            <a>Delete Row</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            dataSource: [],
            count: 0,
            isModalVisible: false,
            newTagName: '',
            selectedRow: null,
        };
        this.getClassifiedResults('gf')
    }


    getClassifiedResults = (fileName) => {
        if (!fileName) return;
        DiswikiApi.getClassificationResult('classified 2.csv')
            .then(res => {
                let tbData = []
                if (res.status === 200) {
                    res.data.forEach(data => {
                        tbData.push({
                            "tags": data.tag,
                            "paragraph": data.paragraph
                        })
                    })
                    this.setState({ 'dataSource': tbData, 'count': tbData.length });
                }
            })
            .catch(err => console.warn(err));
    }
    componentDidUpdate() {
        // this.state = {
        //     dataSource: this.props.tableData,
        //     count: this.props.tableData.length,
        // };
    }
    handleTagDelete = (record, tag) => {
        debugger
        const dataSource = [...this.state.dataSource];
        let index = dataSource.indexOf(record);
        dataSource[index].tags = dataSource[index].tags.filter((item) => item !== tag)
        this.setState({
            dataSource: dataSource,
        });
    }
    handleTagAdd = (record, tag) => {
        this.setState({ isModalVisible: true, selectedRow: record })
    }
    handleDelete = (record) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item !== record),
        });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            paragraph: `paragraph`,
            tags: ['tags']
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };
    handleTagNameChange = (e) => {
        this.setState({ newTagName: e.target.value })
    }
    changeModalVisibleState() {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    handleAddNewTagOk = () => {
        debugger
        this.setState({ isModalVisible: false })
        const dataSource = [...this.state.dataSource];
        let index = dataSource.indexOf(this.state.selectedRow);
        dataSource[index].tags.push({ 'text': this.state.newTagName, 'new': true })
        console.log(dataSource[index].tags)
        this.setState({
            dataSource
        });
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false })
    };
    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Row gutter={[40, 0]}>
                    <Col span={2}>
                        <Button
                            onClick={this.handleAdd}
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}

                        >
                            Add a row
                </Button>
                    </Col>
                </Row>

                <Table
                    pagination={{ pageSize: 2 }}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
                <Modal title="Add new tag" visible={this.state.isModalVisible} onOk={this.handleAddNewTagOk} onCancel={this.handleCancel}>
                    <TextField name="tag-name" label="Tag name" variant="outlined" value={this.state.newTagName} onChange={this.handleTagNameChange} style={{ width: '100%' }} />
                </Modal>
            </div>
        );
    }
}


