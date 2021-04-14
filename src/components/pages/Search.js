import React from 'react';
import TweenOne from 'rc-tween-one';
import { Popover, message, Alert, PageHeader, Card, Menu, Dropdown, Button, Tag, Typography, Row, Col, AutoComplete } from 'antd';

import { Input, Space, Avatar, Divider } from 'antd';
import { UserOutlined, EyeOutlined, AudioOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import QAService from '../../services/QAService'
const { Item, SubMenu } = Menu;
const { Title, Text } = Typography;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
const options = [
    {
        value: 'Discrimination mentioned in',
    },
    {
        value: 'Subtopic of CRPD Article 2',
    },
    {
        value: 'What is disability',
    },
];

// SEARCH RESULTS TAB
const tabList = [
    {
        key: 'Text',
        tab: 'Text',
    },
    {
        key: 'Table',
        tab: 'Table',
    },
    {
        key: 'Graph',
        tab: 'Graph',
    },
];
const contentList = {
    'Text': <p>content1</p>,
    'Table': <p>content2</p>,
    'Graph': <p>content3</p>,
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneOpen: undefined,
            username: "",
            password: "",
            token: "",
            loggedUserName: "",
            loggedIn: false,
            key: 'Text'
        };
    }

    phoneClick = () => {
        const phoneOpen = !this.state.phoneOpen;
        this.setState({
            phoneOpen,
        });
    };
    componentDidMount() {

    }
    Search = Input;

    onSearch = value => {
        QAService.query(value, JSON.parse(window.sessionStorage.getItem('user-config')).accessToken)
            .then(res => {
                console.log(res.data)
                debugger
            })
            .catch(err => {
                console.log(err)
                debugger
            })
    }

    onChange = e => {
        return
        QAService.autocomplete(e.target.value)
            .then(res => {
                console.log(res.data)
                debugger
            })
            .catch(err => {
                console.log(err)
                debugger
            })
    }
    handleMenuClick(value) {

    }
    onTabChange = (key, type) => {
        debugger
        console.log(key, type);
        this.setState({ [type]: key });
    };
    render() {
        return (
            <TweenOne>
                <Row>
                    <Col span={24}>
                        {/* /img/dislogo-bo.jpg */}
                        {/* /img/disability-chair2.png */}
                        <img src='/img/dislogo-bo.jpg' style={{ widht: '15rem', height: '15rem' }}></img>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Title style={{ color: "#198cff", fontFamily: 'Roboto' }} > Disability Wiki</Title>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <AutoComplete
                            style={{
                                width: '100%',
                            }}
                            options={options}
                            placeholder=""
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        >
                            <Input.Search
                                placeholder="Type the first word to autocomplete"
                                allowClear
                                enterButton="Search"
                                size="large"
                                suffix={suffix}
                                style={{ marginTop: -4 }}
                                onChange={this.onChange}
                                onSearch={this.onSearch}
                            />
                        </AutoComplete>

                    </Col>
                    <Col span={8}></Col>
                </Row>
                <br />
                <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                        <Card title="Examples" bordered={false} style={{ width: '100%' }}>
                            <p><Text code>What is discrimination</Text>,
                                <Text keyboard>What is discrimination according to wikidata</Text>,
                                <Text keyboard>What is disabiilty rights</Text>,
                                <Text keyboard>Health definition according to CRPD Article 25</Text>,
                                <Text keyboard>Text from DRPI document</Text>,
                                <Text keyboard>Text from CRPD Article 12</Text>,
                                <Text keyboard>Disability wikibase definition about health </Text>,
                                <Text keyboard>What is prevention of life  </Text>,
                            </p>
                        </Card>

                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                        <Card
                            style={{ width: '100%' }}
                            title="Answers"
                            extra={<a href="#">Train</a>}
                            tabList={tabList}
                            activeTabKey={this.state.key}
                            onTabChange={key => {
                                this.onTabChange(key, 'key');
                            }}
                        >
                            {contentList[this.state.key]}
                        </Card>
                    </Col>
                    <Col span={6}></Col>
                </Row>

                {/* <Row>
                    <Col span={12}>col-12</Col>
                    <Col span={12}>col-12</Col>
                </Row>
                <Row>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                </Row>
                <Row>
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                </Row> */}
            </TweenOne>
        );
    }
}

export default Search;
