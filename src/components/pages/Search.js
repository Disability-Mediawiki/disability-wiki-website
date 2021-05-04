import React from 'react';
import TweenOne from 'rc-tween-one';
import { Popover, message, Alert, PageHeader, Card, Menu, Dropdown, Button, Tag, Typography, Row, Col, AutoComplete } from 'antd';

import { Input, Space, Avatar, Divider } from 'antd';
import { UserOutlined, EyeOutlined, AudioOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import QAService from '../../services/QAService'
const { Item, SubMenu } = Menu;
const { Title, Text, Link } = Typography;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
// const options = [
//     {
//         value: 'Discrimination mentioned in',
//     },
//     {
//         value: 'Subtopic of CRPD Article 2',
//     },
//     {
//         value: 'What is disability',
//     },
// ];

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
            key: 'Text',
            autocomplete_options: [],
            answered: false,
            contentList: [],
            textAnswer: []

        };
    }

    phoneClick = () => {
        const phoneOpen = !this.state.phoneOpen;
        this.setState({
            phoneOpen,
        });
    };
    componentDidMount() {
        let contentList = {
            'Text': <p>content1</p>,
            'Table': <p>content2</p>,
            'Graph': <p>content3</p>,
        };
        this.setState({ contentList })
    }
    Search = Input;

    onSearch = value => {
        QAService.query(value)
            .then(res => {
                debugger
                console.log(res.data)
                if (res.data && res.data.qaContexts) {
                    let data = res.data.qaContexts.qaContext
                    let textAnswer = []
                    data.forEach(elem => {
                        if (elem.label || elem.literal || elem.description) {
                            textAnswer.push({ 'label': elem.label, 'description': elem.description, 'link': elem.links[elem.kb], 'literal': elem.literal })
                        }

                    })
                    this.setState({ textAnswer, answered: true })
                    console.log(this.state.textAnswer)
                }
            })
            .catch(err => {
                console.log(err)
                debugger
            })
    }

    onChange = e => {
        QAService.autocomplete(e.target.value)
            .then(res => {
                let option = [];
                if (res.data === "") {
                    return;
                }
                res.data.forEach(elem => {
                    option.push({ 'value': elem.key })
                })
                this.setState({ autocomplete_options: option })
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
    renderTextAnswer = () => {
        const answer = this.state.textAnswer;
        return (
            <div>
                {answer.map((text, i) => (
                    // <Text mark style={{ fontSize: 26 }}>{this.state.textAnswer.toString()}</Text>
                    <div style={{ border: '2px solid rgb(24 144 255)', marginTop: "2rem" }}>
                        <Card hoverable title={<Link href={text.link} bordered target="_blank">
                            {text.label}</Link>} key={i} bordered={false} style={{ width: '100%' }}>
                            <Text strong style={{ fontSize: 26, color: 'rgb(24 144 255)' }}>{text.description}</Text>
                            <Text strong style={{ fontSize: 25 }}>{text.literal}</Text>
                        </Card>
                    </div>


                ))}
            </div>
        )
    }
    renderAnswer = () => {
        let contentList = {
            'Text': <div>
                {this.renderTextAnswer()}
            </div>,
            'Table': <p>Table</p>,
            'Graph': <p>Graph</p>,
        };
        return (this.state.answered) ? (<Card
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
        </Card>) : null
    }
    render() {
        return (
            <TweenOne>
                <Row>
                    <Col span={24}>
                        {/* /img/dislogo-bo.jpg */}
                        {/* /img/disability-chair2.png */}
                        <img src='/img/nologo.png' style={{ widht: '15rem', height: '15rem' }}></img>
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
                            options={this.state.autocomplete_options}
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
                        {
                            (!this.state.answered) ? <Card title="Examples" bordered={false} style={{ width: '100%' }}>
                                <p ><Text code >What is discrimination</Text>,
                                <Text keyboard>What is discrimination according to wikidata</Text>,
                                <Text keyboard>What is disabiilty rights</Text>,
                                <Text keyboard>Health definition according to CRPD Article 25</Text>,
                                <Text keyboard>Text from DRPI document</Text>,
                                <Text keyboard>Text from CRPD Article 12</Text>,
                                <Text keyboard>Disability wikibase definition about health </Text>,
                                <Text keyboard>What is prevention of life  </Text>,
                            </p>
                            </Card> : null
                        }

                    </Col>
                    {/* <Col span={12}>
                        {
                            (!this.state.answered) ? <Card title="Examples" bordered={false} style={{ width: '100%' }}>
                                <p ><Text code ><p style={{ color: 'black' }}>What is discrimination ,
                                What is discrimination according to wikidata, What is disabiilty rights,Health definition according to CRPD Article 25,
                                Text from DRPI document,Text from CRPD Article 12,Disability wikibase definition about health,
                                 What is prevention of life </p></Text>

                                </p>
                            </Card> : null
                        }

                    </Col> */}
                    <Col span={6}></Col>
                </Row>
                <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                        {
                            this.renderAnswer()
                        }
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
