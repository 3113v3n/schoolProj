import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
// core components
import Admin from "layouts/Admin.jsx";
import "assets/css/material-dashboard-react.css?v=1.6.0";
import Login from "containers/Login/Login";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import adminReducer from "./Redux/Reducers/adminReducer.js";
import supervisorReducer from "./Redux/Reducers/supervisorReducer.js";
import usersReducers from "./Redux/Reducers/usersReducer.js";
import * as actionTypes from "./Redux/Actions/action-types";
import thunk from "redux-thunk";
import editTableReducers from "./Redux/Reducers/editTableReducers.js";
import errorReducers from "./Redux/Reducers/errorReducers.js";
import requireAuth from "./HOC/requireAuth";
import { setMyData } from "./Redux/Actions";
const reducers = combineReducers({
  admin: adminReducer,
  supervisor: supervisorReducer,
  user: usersReducers,
  editTable: editTableReducers,
  error: errorReducers
})
const logger = store => {
  return next => {
    return action => {
      console.log("[Middleware] Dispatching", action);
      const result = next(action);
      console.log("[Middleware] next State", store.getState());
      return result;
    };
  };
};
const composedEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const user = localStorage.getItem("access_token");
const store = createStore(
  reducers,
  composedEnhancers(applyMiddleware(logger, thunk))
);
if(user){
  store.dispatch(setMyData(actionTypes.STORE_TOKEN));
}

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin" component={requireAuth(Admin)} />
      </Switch>
    </Router>
  </Provider>,
  //
  document.getElementById("root")
);
