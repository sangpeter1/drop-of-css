import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import cpg from "./cpg";
import { components } from "./components";
import { componentColors } from "./components";
import templates from "./templates";

const reducer = combineReducers({
  auth,
  cpg,
  components,
  componentColors,
  templates
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./cpg";
export * from "./components";
export * from "./templates";
