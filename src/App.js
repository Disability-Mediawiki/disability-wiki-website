import logo from './logo.svg';
import './App.css';
import ApplicationRoutes from "./config/ApplicationRoutes";
import HomeNav from "./components/layouts/HomeNav";
// import Home from "./components/Home";
import RootMain from "./config/Routes";
import Header from "./views/Header/Header";
import HeaderLinks from "./views/Header/HeaderLinks";
//

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

      <RootMain />
      {/* <ApplicationRoutes /> */}
    </div>
  );
}

export default App;
