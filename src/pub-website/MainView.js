// import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
// import { useRouteMatch } from 'react-router';

import classNames from "classnames";
import Header from "./Header/Header";
import BodyContent from "./BodyContent/BodyContent";
import HeaderLinks from "./Header/HeaderLinks";
import Parallax from "./Parallax/Parallax.js";
import GridContainer from "./Grid/GridContainer.js";
import GridItem from "./Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import styles from "./assets/jss/material-kit-react/views/components.js";

// CARD
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

// LIST
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PublicIcon from '@material-ui/icons/Public';
import GavelIcon from '@material-ui/icons/Gavel';
import PlaceIcon from '@material-ui/icons/Place';
import BottomNavigation from '@material-ui/core/BottomNavigation';

import {
    BrowserRouter as Router,
    // HashRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    Link,
    Redirect,
    withRouter,
    useHistory
} from "react-router-dom";
// import SearchHome from '../components/search/SearchHome'
import SearchResult from './SearchResult/SearchResult'
import QASearch from './SearchResult/QASearch'
import LoginPage from './Login/LoginPage'

import '@fontsource/roboto';
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
const { Title } = Typography;
const searchStyle = makeStyles((theme) => ({
    root: {
        padding: '12px ',
        marginLeft: '8rem',
        display: 'flex',
        alignItems: 'center',
        width: '80%',

    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    exploreRoot: {
        flexGrow: 1,
    },
    explorePaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    explorePaperLeftText: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    card: {
        root: {
            minWidth: 275,
            textAlign: 'left',
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        media: {
            height: '140'
        }
    }

}));
const useStyles = makeStyles(styles);

const MainView = (props) => {
    const { path, url } = useRouteMatch();
    const classes = useStyles();

    const searchCssClass = searchStyle();
    const { ...rest } = props;
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [landingPageData, setLandingPageData] = useState({})
    const [textValues, setTextValues] = useState({ 'keyword': '', 'search': '' })
    useEffect(() => {

    }, []);

    const handleSearchClick = (event) => {

        if (textValues.search) {
            props.history.push({
                pathname: '/wiki_search',
                state: { 'keyword': textValues.search }
            })
        }
    }

    const handleChange = (event) => {
        setTextValues({ 'search': event.target.value })
    }
    return (

        <div>


            <Header
                // <div style={{ marginLeft: '-20rem' }}>Disability Wiki</div>
                brand="DISABILITY WIKI"
                rightLinks={<HeaderLinks />}
                fixed

                color={(window.location.href.split('/')[3] === "") ? "transparent" : 'white'}
                changeColorOnScroll={{
                    height: 400,
                    color: 'white'
                }}
                {...rest}
            />

            <Switch>
                <Route exact path={`/`}><BodyContent /> </Route>
                <Route exact path="/login">< LoginPage /></Route>
                {/* <Route exact path="/wiki_search">< SearchResult /></Route> */}
                {/* <Route exact path="/wiki_search">< QASearch /></Route> */}
                <Route exact path='/wiki_search' component={QASearch} />
            </Switch>


            {/* <BottomNavigation
                showLabels
                style={{ width: '100%' }}
            >
            </BottomNavigation> */}
        </div >


    );


}

export default MainView;
