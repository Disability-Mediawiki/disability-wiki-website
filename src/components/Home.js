import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HomeNav from './layouts/HomeNav'
import Search from './pages/Search'
import MainPage from './main-site/Main'
import Navigation from './main-site/Navigation'
import Features from './main-site/Features'
import About from './main-site/About'
import Services from './main-site/Service'
import Team from './main-site/Team'

import JsonData from '../data/data.json'

import Header from "../views/Header/Header";
import HeaderLinks from "../views/Header/HeaderLinks";

const { Title } = Typography;

const Home = (props) => {
    const { ...rest } = props;
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [landingPageData, setLandingPageData] = useState({})
    useEffect(() => {

        setLandingPageData(JsonData)
    }, []);


    return (
        <div>
            <Navigation data={landingPageData.Navigation} />
            <MainPage data={landingPageData.Header} />
            <Features data={landingPageData.Features} />
            <About data={landingPageData.About} />
            <Services data={landingPageData.Services} />
            <Team data={landingPageData.Team} />
        </div>
    );
}

export default Home;
