import React from 'react';
import { Menu } from 'antd';
import {
    UserOutlined,
    SolutionOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router';

const SideNav = (props) => {
    const history = useHistory();
    // const [collapse, setCollapse] = useState([false]);

    const handleUploadClick = () => {
        history.push('/admin');
    }



    const handleFileClick = () => {
        history.push('/admin/files');
    }
    const handleRequestClick = () => {
        history.push('/admin/request');
    }

    return (
        <div>
            {/*  background: "hsl(230,  89.57%,  15.64%)" */}
            <div style={{ height: "55px", margin: "8px" }}>
                {/* <img src={process.env.PUBLIC_URL + '/public/dis-logo.png'} /> */}
                {
                    props.collapse
                        ? <img src="/img/logo-graph.png" style={{ marginTop: "-2.6rem", height: "9.5rem", marginLeft: "-2.2rem" }} />
                        : <img src="/img/dis-logo2.png" style={{ marginTop: "-4rem", height: "11rem" }} />
                }

            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={handleUploadClick}>
                    <UploadOutlined />
                    <span> Upload</span>
                </Menu.Item>

                <Menu.Item key="3" onClick={handleFileClick}>
                    <SolutionOutlined />
                    <span> Results</span>
                </Menu.Item>
                <Menu.Item key="4" onClick={handleRequestClick}>
                    <SolutionOutlined />
                    <span> Request</span>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default SideNav;
