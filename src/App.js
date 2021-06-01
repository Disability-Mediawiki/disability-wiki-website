import { createBrowserHistory } from "history";
import {
  Route, Switch
} from "react-router-dom";
import './App.css';
import ApplicationRoutes from "./config/ApplicationRoutes";
import PrivateRoute from "./config/PrivateRoute";
import MainView from "./pub-website/MainView";

var hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/admin" component={ApplicationRoutes} />
        <Route path={`/`}><MainView history={hist} /></Route>
      </Switch>

    </div>
  );
}

export default App;
