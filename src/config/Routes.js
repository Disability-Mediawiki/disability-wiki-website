import React from "react";
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SearchHome from '../components/search/SearchHome'
// import Home from '../components/Home'
import ApplicationRoutes from './ApplicationRoutes'
import { createBrowserHistory } from "history";
import MainView from '../views/MainView'
import SearchResult from '../views/SearchResult/SearchResult'
import LoginPage from '../views/Login/LoginPage'

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

const RootMain = () => (
    <main>
        <Router history={hist}>
            <Switch>
                {/* <Route exact path='/home' component={Home} /> */}
                {/* <Route exact path='/admin' component={ApplicationRoutes} /> */}
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/wiki_search' component={SearchResult} />
                <Route exact path="/search" component={SearchHome} />
                {/* <Route component={WithContainer} />  */}

                <Route exact path='/' component={MainView} />
            </Switch>
        </Router>
    </main>
)

export default RootMain