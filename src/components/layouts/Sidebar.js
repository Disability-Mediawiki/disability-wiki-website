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

    const handleUserClick = () => {
        history.push('/upload');
    }

    const handleVideosClick = () => {

        history.push('/videos');

    }

    const handleFileClick = () => {
        history.push('/files');
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
                <Menu.Item key="1" onClick={handleUserClick}>
                    <UploadOutlined />
                    <span> Upload</span>
                </Menu.Item>
                {/* <Menu.Item key="2" onClick={handleVideosClick}>
                    <VideoCameraOutlined />
                    <span> Videos</span>
                </Menu.Item> */}
                <Menu.Item key="3" onClick={handleFileClick}>
                    <SolutionOutlined />
                    <span> Results</span>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default SideNav;
