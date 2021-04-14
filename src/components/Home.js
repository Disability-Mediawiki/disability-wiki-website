import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HomeNav from './layouts/HomeNav'
import Search from './pages/Search'

const { Title } = Typography;

const Home = () => {
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    useEffect(() => {


    }, []);

    return (
        <div>
            <HomeNav />
            <Search />
        </div>


    );
}

export default Home;
