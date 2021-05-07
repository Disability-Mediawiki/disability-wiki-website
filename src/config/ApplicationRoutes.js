import React, { useState, useEffect } from 'react';
// BrowserRouter
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";
// import List from "../components/pages/list";
import DocumentResult from "../components/pages/DocumentResult";
import SideNav from "../components/layouts/Sidebar";
// import File from "../components/pages/files";
// import Videos from "../components/pages/videos";
import { Layout, Row, Col } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import UploadFile from '../components/pages/Upload';
import FileUpload from '../components/pages/FileUpload';
import UploadRequest from '../components/pages/UploadRequest';
import PrivateRouteAdmin from "./PrivateRouteAdmin";
const { Header, Sider, Content } = Layout;


const ApplicationRoutes = (props) => {
    const [collapse, setCollapse] = useState(false);
    const location = useLocation();
    useEffect(() => {
        window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
    }, []);

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
                            {/* <Route path="/admin/request" history={props.history} >
                                <UploadRequest />
                            </Route> */}
                            <PrivateRouteAdmin path="/admin/request" component={UploadRequest} />

                            <Route exact path="/admin" history={props.history} >
                                <FileUpload />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default ApplicationRoutes;