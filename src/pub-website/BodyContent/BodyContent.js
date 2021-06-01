// import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import classNames from "classnames";

import Parallax from "../Parallax/Parallax.js";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
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
import styles from "../assets/jss/material-kit-react/views/components.js";

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
import GroupIcon from '@material-ui/icons/Group';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

import { FundProjectionScreenOutlined } from '@ant-design/icons';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
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
    aboutCardRoot: {
        maxWidth: 345,
    },
    aboutCardMedia: {
        height: 140,
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
const BodyContent = (props) => {
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
            history.push({
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
            {/* <Parallax image={require("./assets/img/bg4.jpg")}> */}
            {/* <Parallax image='/img/blog-work-dis.png'> */}
            <Parallax image='/img/3715.jpg'>

                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h1 className={classes.title} style={{ marginTop: '30rem', color: 'rgb(250 180 6)', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000' }}>Disability Wiki Project</h1>

                                {/* <h3 className={classes.subtitle} style={{
                                    color: '#006a82', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000'
                                }}>
                                    Linked Open Data Project.
                                </h3> */}
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <Typography variant="h4" style={{ fontFamily: 'Roboto', paddingTop: '2rem' }} gutterBottom>
                    Explore the disability rights, conventions and different topics about disability rights based on different countries

                </Typography>

                <Paper component="form" className={searchCssClass.root} >

                    <FilledInput
                        style={{ width: '100%', backgroundColor: 'white' }}
                        id="standard-adornment-password"
                        type='text'
                        placeholder="Search Documents, Places, Concepts"
                        value={textValues.search}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleSearchClick}
                                // onMouseDown={handleMouseDownPassword}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Paper>



                <Divider style={{ marginTop: "1rem" }} />
                <div style={{ paddingTop: '3rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <div style={{ paddingLeft: '1rem', }}>
                                <Card className={classes.aboutCardRoot} style={{ height: '27rem' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.aboutCardMedia}
                                            image="/static/images/cards/contemplative-reptile.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent style={{ textAlign: 'center' }}>
                                            <TrackChangesIcon style={{ fontSize: '5rem' }} />
                                            <Typography gutterBottom variant="h4" component="h2">
                                                About
                                        </Typography>
                                            <Typography variant="h6" color="textPrimary" >
                                                The data behind this project is Free, Open-source linked data that is mainted in MediaWiki Project,
                                                Promote the rights and information about disability rights and related articles based on different regions
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div >
                                <Card className={classes.aboutCardRoot} style={{ height: '27rem' }}>
                                    <CardActionArea>
                                        <CardContent style={{ textAlign: 'center' }}>
                                            <AccessibleForwardIcon style={{ fontSize: '5rem' }} />
                                            <Typography gutterBottom variant="h4" component="h2">
                                                Motivation
                                        </Typography>
                                            <Typography variant="h6" color="textPrimary" >
                                                Human rights monitoring for people with disabilities is in urgent need
                                                Our aim is to use a Wikibase for editing, integrating and storing structured disability related data
                                                Includes deliberation between content experts in critical disability and health informatics and computer science professionals

                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div>
                                <Card className={classes.aboutCardRoot} style={{ height: '27rem' }}>
                                    <CardActionArea>
                                        <CardContent style={{ textAlign: 'center' }}>
                                            <FundProjectionScreenOutlined style={{ fontSize: '5rem' }} />
                                            <Typography gutterBottom variant="h4" component="h2">
                                                Project
                                        </Typography>
                                            <Typography variant="h6" color="textPrimary" >
                                                Human rights monitoring for people with disabilities is in urgent need
                                                Our aim is to use a Wikibase for editing, integrating and storing structured disability related data
                                                Includes deliberation between content experts in critical disability and health informatics and computer science professionals

                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div >
                                <Card className={classes.aboutCardRoot} style={{ marginRight: '1rem', height: '27rem' }}>
                                    <CardActionArea>
                                        <CardContent style={{ textAlign: 'center' }}>
                                            <GroupIcon style={{ fontSize: '5rem' }} />
                                            <Typography gutterBottom variant="h4" component="h2">
                                                Team
                                        </Typography>
                                            <Typography variant="h6" color="textPrimary" >
                                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                across all continents except Antarctica
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>
                </div>


            </div>
            <Divider style={{ marginTop: '3rem' }} />
            <div style={{ backgroundColor: '#e8eaed' }}>
                <Grid container spacing={3} style={{ paddingTop: '3rem' }}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3} style={{ paddingLeft: '3rem' }}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root} style={{ height: '4rem' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '3rem' }} src='/img/yu-logo.png' />
                                        {/* <Typography gutterBottom variant="h5" component="h2">
                                            York Univesrity
                                     </Typography> */}
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </Paper>

                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root} style={{ height: '4rem' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '3rem' }} src='/img/use-logo.png' />
                                        {/* <Typography gutterBottom variant="h5" component="h2">
                                            York Univesrity
                                     </Typography> */}
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </Paper>

                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root} style={{ height: '4rem' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '3rem', width: '8rem' }} src='/img/qa-logo.png' />
                                        {/* <Typography gutterBottom variant="h5" component="h2">
                                            York Univesrity
                                     </Typography> */}
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </Paper>

                    </Grid>

                </Grid>
            </div>
            {/* <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a> */}
        </div >


    );


}

export default BodyContent;
