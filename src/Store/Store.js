import Test from "../Reducers/Home";
import Packet from "../Reducers/Packet";
// import { createLogger } from "redux-logger";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Logger for watch actions when process is in development environment only
// const loggerLoad = createLogger({
//   predicate: () => process.env.NODE_ENV === "development"
// });

// Created globale store
export default createStore(
  combineReducers({ Test, Packet }),
  {}, // Set Default state or initial state if needed else set blank as it is.
  compose(
    applyMiddleware(thunk) // added middleware which need through out process or action.
  )
);

// const Store = createStore(Home, {}, applyMiddleware(logger));

// export default Store;
