import React from "react";
import Login from "./components/Login/Login";
import Layout from "./components/Home/Layout";
import Rough from "./components/Rough/Rough";
// import RoughListing from './components/Rough/index';
import roughContainer from './Container/Rough/index';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/home" component={Layout} />
				<Route exect path="/rough" name="rough" component={roughContainer}/>
				{/* <Route exect path="/rough" name="rough" component={RoughListing}/> */}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
