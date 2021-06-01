
import { useEffect, useState } from 'react';
import '@fontsource/roboto';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// CARD
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { useHistory } from 'react-router-dom';
import DiswikiApi from '../../services/DiswikiApi';
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/components.js";

// DIALOG
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// TABLE
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//
import Pagination from '@material-ui/lab/Pagination';

// core components
import Header from "../Header/Header.js";
import HeaderLinks from "../Header/HeaderLinks.js"
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
    },
    table: {
        minWidth: 300,

    }

}));
const useStyles = makeStyles(styles);
const SearchResult = (props) => {
    const classes = useStyles();
    const searchCssClass = searchStyle();
    const { ...rest } = props;
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [searchResuls, setSearchResults] = useState([]);
    const [cardDisplayCount, setCardDisplayCount] = useState(3);
    const [searchTerm, setSearchTerm] = useState('')
    const [modalState, setModalState] = useState(false);
    const [selectedConcept, setSelectedConcept] = useState(null);
    const [pagination, setPagination] = useState({ 'status': false });
    useEffect(() => {

        // console.log(porps.hostory..location.state.keyword)
        if (history.location.state.keyword && history.location.state.keyword !== '') {
            setSearchTerm(history.location.state.keyword)
            publicSearch(history.location.state.keyword)
        }

    }, []);

    const publicSearch = async (search_word) => {
        DiswikiApi.test(search_word)
            .then(res => {
                setSearchResults(res.data)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const renderCardGrid = () => {
        let elem = []
        for (let i = 0; i < searchResuls.length / cardDisplayCount; i++) {
            elem.push(<Grid item xs={6} sm={1} key={'topGrid' + i}></Grid>)
            elem.push(
                renderCard(i)
            )
        }
        return elem;
    }

    const handleCardClick = (concept) => {
        if (concept) {
            setSelectedConcept(concept)
            setModalState(true);
        }
    }
    const handleModalClose = (concept) => {
        setModalState(false);
    }
    const renderCard = (index) => {
        let resultSliced = []
        let start = index * cardDisplayCount
        let end = start + cardDisplayCount
        resultSliced = searchResuls.slice(start, end);
        let renderer = []
        resultSliced.forEach((element, i) => {
            renderer.push(
                <Grid item xs={6} sm={3} key={'innerGrid' + i}>
                    <Paper className={classes.explorePaper}>
                        <Card className={searchCssClass.card.root}>
                            <CardContent style={{ textAlign: 'left' }}>
                                <Typography variant="h6" component="h2">
                                    {element.label}
                                </Typography>
                                <Typography className={searchCssClass.card.title} color="textSecondary" gutterBottom>
                                    {element.description}
                                </Typography>

                                <Typography className={searchCssClass.card.pos} color="textSecondary">
                                    {element.concepturi}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Concept Disability Wiki
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleCardClick(element)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
            )
        });
        renderer.push(<Grid item xs={6} sm={2} key={'outerGrid' + index}></Grid>)
        return renderer;
    }

    return (
        <div>
            {/* <Header
                absolute
                color="transparent"
                brand="Disability Wiki Project"
                onClick={() => console.log('logo clicked')}
                // onLeftIconButtonClick={() => handleLogoClick}
                rightLinks={<HeaderLinks />}
                {...rest}
            /> */}
            <div style={{ paddingTop: '6rem' }}>
                <div className={classes.exploreRoot}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div style={{ textAlign: 'left', paddingLeft: '5rem' }}>
                                <Typography variant="h4" gutterBottom>
                                    Seach : {searchTerm}
                                </Typography>
                            </div>
                        </Grid>
                        {
                            renderCardGrid()
                        }
                    </Grid>
                </div>
            </div>
            <Dialog
                open={modalState}
                onClose={handleModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{(selectedConcept) ? selectedConcept.label : 'No results'}</DialogTitle>

                {(selectedConcept !== undefined || selectedConcept !== null) ? (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">


                            {(selectedConcept) ? selectedConcept.description : 'No results'}
                            {<br></br>}
                            {(selectedConcept) ? <a href={selectedConcept.concepturi} target="left">{selectedConcept.concepturi}</a> : 'No results'}
                        </DialogContentText>

                        <TableContainer component={Paper}>
                            <Table className={searchCssClass.table} aria-label="simple table">
                                <TableBody>{
                                    (selectedConcept) ? (
                                        selectedConcept.properties.map((row, i) => (
                                            <TableRow key={row.propLabel.value + i}>
                                                <TableCell align="left" component="th" scope="row">
                                                    {row.propLabel.value}
                                                </TableCell>
                                                <TableCell align="left">{row.bLabel.value}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : null
                                }


                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                ) : (null)
                }


                <DialogActions>
                    <Button onClick={handleModalClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {(pagination.status) ? <div style={{ marginTop: '3rem' }}>
                <Grid container spacing={3}>
                    {/* <Grid item xs={6} sm={4}></Grid> */}
                    <Grid item xs={6} sm={5} style={{ marginLeft: '30%' }}>
                        <Pagination count={10} color="primary" size="large" />
                    </Grid>
                    <Grid item xs={6} sm={3}></Grid>
                </Grid>

            </div> : null}
        </div>


    )
}

export default SearchResult;