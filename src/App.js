import logo from './logo.svg';
import './App.css';
import ApplicationRoutes from "./config/ApplicationRoutes";
// import HomeNav from "./components/layouts/HomeNav";
// import Home from "./components/Home";
// import RootMain from "./config/Routes";
import MainView from "./views/MainView";
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./config/PrivateRoute";

var hist = createBrowserHistory();
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <ApplicationRoutes /> */}
      {/* <HomeNav /> */}

      {/* <RootMain /> */}
      {/* <Router> */}

      {/* </Router> */}

      <Switch>
        <PrivateRoute path="/admin" component={ApplicationRoutes} />
        {/* <Route exact path="/admin">< ApplicationRoutes history={hist} /></Route> */}
        <Route path={`/`}><MainView history={hist} /></Route>
      </Switch>


    </div>
  );
}

export default App;
