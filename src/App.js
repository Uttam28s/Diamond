import React from "react";
import Login from "./components/Login/Login";
import Layout from "./components/Home/Layout";
import routes from "./js/Routes";
import Rough from "./components/Rough/Rough";
import PacketPartition from "./components/PacketPatition/PacketPartition";
// import RoughListing from './components/Rough/index';
// import roughContainer from './Container/Rough/index';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.home} component={Layout} />
        {/* <Route exect path="/rough" name="rough" component={roughContainer}/> */}
        <Route exect path={routes.rough} name="rough" component={Rough} />
        <Route exact path={routes.officepacket} component={PacketPartition} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
