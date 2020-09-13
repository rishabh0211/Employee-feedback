import { createStore, applyMiddleware, compose } from "redux";
import userReducer from "../reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    userReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};