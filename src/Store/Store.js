import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import Home from "../Reducers/Home";

const Store = createStore(Home, {}, applyMiddleware(logger));

export default Store;
