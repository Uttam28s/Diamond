import React, {useEffect} from "react";
import Login from "./components/Login/Login";
import Layout from "./components/Home/Layout";
import Rough from "./components/Rough/Rough";
import { BrowserRouter, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Layout} />
        <Route path="/rough" component={Rough} />
      </div>
    </BrowserRouter>
  );
}

export default App;
