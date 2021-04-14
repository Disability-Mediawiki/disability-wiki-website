import React from 'react';
import TweenOne from 'rc-tween-one';
import { getChildrenToRender } from './utils';
import { Popover, message, Alert, PageHeader, Card, Menu, Dropdown, Button, Tag, Typography, Row, Col } from 'antd';

import { Input, Space, Avatar, Divider } from 'antd';
import { UserOutlined, EyeOutlined, AudioOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import QAService from '../../services/QAService'
const { Item, SubMenu } = Menu;
const { Title, Text } = Typography;

class HomeNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneOpen: undefined,
            username: "",
            password: "",
            token: "",
            loggedUserName: "",
            loggedIn: false
        };
    }

    componentDidMount() {
        if (window.sessionStorage.getItem('user-name')) {
            this.setState({ loggedUserName: window.sessionStorage.getItem('user-name'), loggedIn: true })
        }
    }

    onPasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    }
    onUsernameChange = e => {
        this.setState({
            username: e.target.value
        });
    }
    getLoginErrorContent = () => {
        return (
            <Alert message="Error" description="This is an error message about copywriting."
                type="error"
                showIcon />
        )
    }
    loginAlert = (type, msg) => {
        if (type == 'success') {
            message.success({
                content: 'Successfully loged in',
                className: 'custom-class',
                style: {
                    marginTop: '4vh',
                },
            });
        }
        if (type == 'logout') {
            message.success({
                content: 'Successfully logged out ',
                className: 'custom-class',
                style: {
                    marginTop: '4vh',
                },
            });
        }
        else if (type == 'required') {
            message.warn({
                content: 'Required username and password : ',
                className: 'custom-class',
                style: {
                    marginTop: '4vh',
                },
            });
        }
        else if (type == 'error') {
            message.error({
                content: 'Invalid username or password ' + msg,
                className: 'custom-class',
                style: {
                    marginTop: '4vh',
                },
            });
        }
    }
    login = () => {
        if (!this.state.username || !this.state.password) {
            this.loginAlert('required')
            return;
        }
        QAService.login(this.state.username, this.state.password)
            .then(res => {
                window.sessionStorage.setItem("user-config", JSON.stringify(res.data));
                window.sessionStorage.setItem("user-name", this.state.username);

                this.setState({ loggedIn: true, loggedUserName: this.state.username })
                this.loginAlert('success')
            })
            .catch(error => {
                console.log(error);
                this.loginAlert('error', error)
            });
    }
    loggout = () => {
        window.sessionStorage.removeItem("user-config");
        window.sessionStorage.removeItem("user-name");

        this.setState({ loggedIn: false, loggedUserName: "" })
        this.loginAlert('logout')

    }
    text = <div style={{ textAlign: 'center' }}><span style={{ alignContent: 'center' }}>Login</span></div>
    menu = () => {
        return this.state.loggedIn ?
            (
                <Menu onClick={this.handleMenuClick}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Text >{window.sessionStorage.getItem('user-name')}</Text>
                    </Menu.Item>
                    <Menu.Item key="2" style={{ marginLeft: '0.5rem' }}>
                        <Button type="primary" shape="round" onClick={this.loggout} style={{ width: '8rem' }} icon={<LoginOutlined />} size={'large'}>Logout</Button>
                    </Menu.Item>
                </Menu>

            ) : (
                <Menu onClick={this.handleMenuClick}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Input placeholder="username" onChange={this.onUsernameChange} style={{ width: "10rem" }} />
                    </Menu.Item>
                    <Menu.Item key="2" icon={<EyeOutlined />}>
                        <Input placeholder="password" onChange={this.onPasswordChange} type="password" style={{ width: "10rem" }} />
                    </Menu.Item>
                    <Menu.Item key="3" style={{ marginLeft: '2.5rem' }}>
                        <Button type="primary" shape="round" onClick={this.login} style={{ width: '8rem' }} icon={<LoginOutlined />} size={'large'}>Login</Button>
                    </Menu.Item>
                    <Menu.Item key="4" style={{ marginLeft: '3.8rem', width: '10 rem' }}>
                        <Button type="primary" type="link">Sign Up</Button>
                    </Menu.Item>
                </Menu >
            )
    };

    handleMenuClick(value) {

    }

    render() {
        return (
            <TweenOne>
                <Row>
                    <Col span={24}>

                        <PageHeader
                            title="Disability Wiki"
                            className="site-page-header"
                            subTitle="Knowledge Graph"
                            tags={<Tag color="blue">V-1.0</Tag>}
                            extra={[
                                <Space key="1" direction="vertical">
                                    <a href="mailto:dhayanthdharma@gmail.com">Contact</a>
                                </Space>,
                                <Space key="2" direction="vertical">
                                    <Button type="secondary" type="link">{(window.sessionStorage.getItem('user-name') ? window.sessionStorage.getItem('user-name') : 'Not logged in')}</Button>
                                </Space>,
                                <Popover key="3" placement="bottomRight" title={this.text} content={this.menu} trigger="click">
                                    <Button key="1" shape="circle" type="primary" >
                                        <UserOutlined />
                                    </Button>
                                </Popover>

                            ]}
                            avatar={{ src: '/img/disability-chair2.png' }}

                        ></PageHeader>

                    </Col>
                </Row>
                <Divider />

            </TweenOne>
        );
    }
}

export default HomeNav;
