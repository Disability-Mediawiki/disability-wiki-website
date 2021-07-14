import { EyeOutlined, LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
// import File from "../components/pages/files";
// import Videos from "../components/pages/videos";
import { Button, Col, Empty, Input, Layout, Menu, Popover, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
// BrowserRouter
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import SideNav from "../components/layouts/Sidebar";
// import List from "../components/pages/list";
import DocumentResult from "../components/pages/DocumentResult";
import Documents from '../components/pages/Documents';
import FileUpload from '../components/pages/FileUpload';
import TrainModel from '../components/pages/TrainModel';
import UploadRequest from '../components/pages/UploadRequest';
import PrivateRouteAdmin from "./PrivateRouteAdmin";

const { Header, Sider, Content } = Layout;


const ApplicationRoutes = (props) => {
    const [collapse, setCollapse] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    useEffect(() => {
        window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
        if (window.sessionStorage.getItem('userName'))
            setLoggedIn(true)
    }, []);
    const loggout = () => {
        window.sessionStorage.clear();
        window.location.href = "/"
    }
    const menu = () => {
        return loggedIn ?
            (
                <Menu onClick={e => { }}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Typography.Text >{window.sessionStorage.getItem('userName')}</Typography.Text>
                    </Menu.Item>
                    <Menu.Item key="2" style={{ marginLeft: '0.5rem' }}>
                        <Button type="primary" shape="round" onClick={loggout} style={{ width: '8rem' }} icon={<LoginOutlined />} size={'large'}>Logout</Button>
                    </Menu.Item>
                </Menu>

            ) : (
                <Menu onClick={e => { }}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Input placeholder="username" onChange={e => { }} style={{ width: "10rem" }} />
                    </Menu.Item>
                    <Menu.Item key="2" icon={<EyeOutlined />}>
                        <Input placeholder="password" onChange={e => { }} type="password" style={{ width: "10rem" }} />
                    </Menu.Item>
                    <Menu.Item key="3" style={{ marginLeft: '2.5rem' }}>
                        <Button type="primary" shape="round" onClick={e => { }} style={{ width: '8rem' }} icon={<LoginOutlined />} size={'large'}>Login</Button>
                    </Menu.Item>
                    <Menu.Item key="4" style={{ marginLeft: '3.8rem', width: '10 rem' }}>
                        <Button type="primary" type="link">Sign Up</Button>
                    </Menu.Item>
                </Menu >
            )
    };


    const handleToggle = (event) => {
        event.preventDefault();
        collapse ? setCollapse(false) : setCollapse(true);
    }
    return (
        <Router>
            <Layout>

                <Sider trigger={null} collapsible collapsed={collapse}>
                    <SideNav collapse={collapse} />
                </Sider>
                <Layout>
                    {/* #001529*/}
                    <Header className="siteLayoutBackground" style={{ padding: 0, background: "rgb(6 2 61 / 95%)" }}>
                        <Row>
                            <Col span={1}>

                                {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: handleToggle,
                                    style: { color: "#fff" }
                                    // position: "relative", marginLeft: "-81.6rem" 
                                })}
                            </Col>
                            <Col span={16}></Col>
                            <Col span={7}>

                                <Space key="menu-1" direction="vertical">
                                    <a href="mailto:dhayanthdharma@gmail.com">Contact</a>
                                </Space>,
                                <Space key="menu-2" direction="vertical">
                                    <Button type="secondary" type="link">{(window.sessionStorage.getItem('userName') ? window.sessionStorage.getItem('userName') : 'Not logged in')}</Button>
                                </Space>,
                                <Popover key="menu-3" placement="bottomRight" title={'Login'} content={menu} trigger="click">
                                    <Button shape="circle" type="primary" >
                                        <UserOutlined />
                                    </Button>
                                </Popover>



                            </Col>
                        </Row>

                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff" }}>
                        <Switch>
                            {/* <Route path="/admin/files" component={DocumentResult} />
                            <Route path="/admin" component={FileUpload} />
                            <Route path="/admin/request" component={UploadRequest} /> */}
                            <Route exact path="/admin/files"  >
                                <DocumentResult history={props.history} />
                            </Route>
                            {/* <Route exact path="/admin/training"  >
                                <Empty history={props.history} />
                            </Route> */}
                            {/* <Route path="/admin/request" history={props.history} >
                                <UploadRequest />
                            </Route> */}
                            <PrivateRouteAdmin path="/admin/request" component={UploadRequest} />

                            <Route exact path="/admin/upload" history={props.history} >
                                <FileUpload />
                            </Route>
                            <Route exact path="/admin/training" history={props.history} >
                                <TrainModel />
                            </Route>
                            <Route exact path="/admin" history={props.history} >
                                <Documents />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default ApplicationRoutes;