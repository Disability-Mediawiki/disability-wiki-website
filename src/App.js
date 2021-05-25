import logo from './logo.svg';
import './App.css';
import ApplicationRoutes from "./config/ApplicationRoutes";
// import HomeNav from "./components/layouts/HomeNav";
// import Home from "./components/Home";
// import RootMain from "./config/Routes";
import MainView from "./pub-website/MainView";
import SearchHome from './components/search/SearchHome'

// import { Document, Page } from "react-pdf";
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

// import MyApp from "./pub-website/DocumentViewer/DocumentViewer";
// import SinglePage from "./pub-website/DocumentViewer/New";

// import { Worker } from '@react-pdf-viewer/core';
// import { Viewer } from '@react-pdf-viewer/core';


import PdfViewer from "./pub-website/DocumentViewer/PdfViewer";


// Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';

// Your render function
var hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
        <SinglePage />
      </Worker> */}
      {/* <PDFViewer
        file={"http://localhost:5000/api/file/showfile"}
        filename="Análise de eficiência na detecção de vulnerabilidades em sistemas web com o uso de ferramentas gratuitas e de código aberto"
        onClose={() => console.log("OnClose")}
      /> */}

      <Switch>
        <PrivateRoute path="/admin" component={ApplicationRoutes} />
        <Route path={`/qanswer`}><SearchHome history={hist} /></Route>
        <Route path={`/`}><MainView history={hist} /></Route>
      </Switch>
      {/* <Route exact path="/admin">< ApplicationRoutes history={hist} /></Route> */}
      {/* <PdfViewer /> */}

    </div>
  );
}

export default App;
