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


class QASearch extends React.Component {
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
            searchKey: '',
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

        if (this.props.location.state && this.props.location.state.keyword !== '') {
            this.setState({ searchKey: this.props.location.state.keyword })
            this.onSearch(this.props.location.state.keyword)
        }
    }

    onSearch = value => {
        QAService.query(value)
            .then(res => {
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

            })
    }
    onSelect = (data) => {
        this.setState({ searchKey: data })
    };
    onChange = e => {

        this.setState({ searchKey: e.target.value })
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

            })
    }
    handleMenuClick(value) {

    }
    onTabChange = (key, type) => {

        console.log(key, type);
        this.setState({ [type]: key });
    };
    renderTextAnswer = () => {
        const answer = this.state.textAnswer;
        return (
            <div>
                {answer.map((text, i) => (
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
            <div
                style={{
                    // backgroundImage: `url(/img/blog-work-dis.png)`,
                    backgroundImage: `url(/img/3715.jpg)`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    // height: '100vh'
                    marginTop: '3rem',
                    height: '35vh'
                }}
            >
                <div style={{
                    height: '35vh',
                    // height: '30%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: '100vw',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',

                }}>

                    <TweenOne >

                        <Row>
                            <Col span={24}>
                                {/* <h1 className={classes.title} style={{ color: 'white', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000' }}>Disability Wiki Project</h1> */}
                                <Title style={{ color: "white", fontFamily: 'Roboto', marginTop: '10rem', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000' }} > Disability Wiki</Title>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={4}></Col>

                            <Col span={16}>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    onSelect={this.onSelect}
                                    options={this.state.autocomplete_options}
                                    value={this.state.searchKey}
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
                            <Col span={4}></Col>
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
                    </TweenOne>
                </div>
            </div >
        );
    }
}

export default QASearch;
