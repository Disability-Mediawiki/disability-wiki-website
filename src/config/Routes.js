import React from "react";
import {
    BrowserRouter as Router,
    // HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import SearchHome from '../components/search/SearchHome'
// import Home from '../components/Home'
import ApplicationRoutes from './ApplicationRoutes'
import { createBrowserHistory } from "history";
import MainView from '../pub-website/MainView'
import SearchResult from '../pub-website/SearchResult/SearchResult'
import LoginPage from '../pub-website/Login/LoginPage'
import Header from "../pub-website/Header/Header";
import BodyContent from "../pub-website/BodyContent/BodyContent";

import HeaderLinks from "../pub-website/Header/HeaderLinks";

var hist = createBrowserHistory();

const WithContainer = () => (
    // <div className="container">
    /* Wrap routes in container div */

    // </div>
    <div>
        <Route exact path="/search" component={SearchHome} />
    </div>

)
const AdminPannel = () => (
    // <div className="container">
    /* Wrap routes in container div */

    // </div>
    <ApplicationRoutes />

)
const RootMain = (props) => (

    <main>
        <Router history={hist}>
            <Switch>
                <Route path='/home' component={MainView} />
                <Route exact path='/admin' component={ApplicationRoutes} />
                {/* <Route exact path='/login' component={LoginPage} /> */}
                <Route exact path='/wiki_search' component={SearchResult} />
                {/* <Route exact path="/search" component={SearchHome} /> */}
                {/* <Route component={WithContainer} />  */}

                {/* <Redirect to="/home" from="/" /> */}

            </Switch>
        </Router>
    </main>
)

export default RootMain