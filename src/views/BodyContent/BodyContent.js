// import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import classNames from "classnames";
import Header from "../Header/Header";
import HeaderLinks from "../Header/HeaderLinks";
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
        debugger
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
            <Parallax image='/img/blog-work-dis.png'>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h1 className={classes.title} style={{ color: 'white', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000' }}>Disability Wiki Project</h1>
                                <h3 className={classes.subtitle} style={{
                                    color: 'white', textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000'
                                }}>
                                    Linked Open data project.
            </h3>
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

                <div style={{ paddingTop: '3rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <div style={{ textAlign: 'left', paddingLeft: '5rem' }}>
                                <Typography variant="h4" gutterBottom>
                                    Explore
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Browse Documents, Conventions, Events, Places, and More
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div style={{ textAlign: 'left' }}>
                                <Card className={searchCssClass.card.root}>
                                    <CardContent style={{ textAlign: 'left' }}>
                                        <List component="nav" aria-label="main mailbox folders">
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <InsertDriveFileIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="DOCUMENTS" />
                                            </ListItem>
                                            <Divider />
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <PublicIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="COUNTRIES" />
                                            </ListItem>
                                            <Divider />
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <PlaceIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="PEOPLE" />
                                            </ListItem>
                                            <Divider />
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <GavelIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="RIGHTS" />
                                            </ListItem>
                                        </List>

                                    </CardContent>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {/* <Divider style={{ paddingTop: '1rem' }} /> */}
                <div style={{ paddingTop: '3rem' }}>
                    <div className={classes.exploreRoot}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div style={{ textAlign: 'left', paddingLeft: '5rem' }}>
                                    <Typography variant="h4" gutterBottom>
                                        Topics
                                </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={1}></Grid>
                            <Grid item xs={6} sm={3}>
                                <Paper className={classes.explorePaper}>
                                    <Card className={searchCssClass.card.root}>
                                        <CardContent style={{ textAlign: 'left' }}>
                                            <Typography variant="h6" component="h2">
                                                CRPD Article 1
                                            </Typography>
                                            <Typography className={searchCssClass.card.title} color="textSecondary" gutterBottom>
                                                Subtopic
                                             </Typography>

                                            <Typography className={searchCssClass.card.pos} color="textSecondary">
                                                Health
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                well beign of human
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Paper className={classes.explorePaper}>
                                    <Card className={searchCssClass.card.root}>
                                        <CardContent style={{ textAlign: 'left' }}>
                                            <Typography variant="h6" component="h2">
                                                Diability
                                            </Typography>
                                            <Typography className={searchCssClass.card.title} color="textSecondary" gutterBottom>
                                                Rights
                                             </Typography>

                                            <Typography className={searchCssClass.card.pos} color="textSecondary">
                                                Information on Disabi....
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                Rights of a disabled person
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Paper className={classes.explorePaper}>
                                    <Card className={searchCssClass.card.root}>
                                        <CardContent style={{ textAlign: 'left' }}>
                                            <Typography variant="h6" component="h2">
                                                Prevention of rights
                                            </Typography>
                                            <Typography className={searchCssClass.card.title} color="textSecondary" gutterBottom>
                                                Rights from WHO
                                             </Typography>

                                            <Typography className={searchCssClass.card.pos} color="textSecondary">
                                                Sub rights
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                Explore
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>

                        </Grid>
                    </div>
                </div>

                <Divider style={{ marginTop: "1rem" }} />
                <div style={{ paddingTop: '3rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <div style={{ textAlign: 'left', paddingLeft: '5rem' }}>
                                <Typography variant="h4" gutterBottom>
                                    About us
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    The data behind this project is Free, Open-source linked data that is mainted in MediaWiki Project,
                                    Promote the rights and information about disability rights and related articles based on different regions
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div style={{ textAlign: 'left' }}>
                                <Card className={searchCssClass.card.root}>
                                    <CardContent style={{ textAlign: 'left' }}>
                                        <Typography variant="h6" gutterBottom>
                                            The data behind this project is Free, Open-source linked data that is mainted in MediaWiki Project,
                                            Promote the rights and information about disability rights and related articles based on different regions
                                </Typography>

                                    </CardContent>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>
                </div>


            </div>
            <Divider style={{ marginTop: '3rem' }} />
            <div style={{ backgroundColor: '#e8eaed' }}>
                <Grid container spacing={3} style={{ paddingTop: '3rem' }}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '30px' }} src='/img/yu-logo.png' />
                                        <Typography gutterBottom variant="h5" component="h2">
                                            York Univesrity
                                     </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </Paper>

                    </Grid>
                    <Grid item xs={2}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '30px' }} src='/img/yu-logo.png' />
                                        <Typography gutterBottom variant="h5" component="h2">
                                            York Univesrity
                                     </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '30px' }} src='/img/use-logo.png' />
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Jean Monnet-Uni.
                                     </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper elevation={3}  >
                            <Card className={searchCssClass.card.root}>
                                <CardActionArea>
                                    <CardContent>
                                        <img style={{ height: '30px' }} src='/img/use-logo.png' />
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Jean Monnet-Uni.
                                     </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

        </div >


    );


}

export default BodyContent;
