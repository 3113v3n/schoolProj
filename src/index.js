import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import "assets/css/material-dashboard-react.css?v=1.6.0";
import Login from "containers/Login/Login";
import { Provider } from "react-redux";
import { setAuthorizationToken} from "./services/requests"
//REDUX
import jwtDecode from "jwt-decode";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import adminReducer from "./Redux/Reducers/adminReducer.js";
import supervisorReducer from "./Redux/Reducers/supervisorReducer.js";
import usersReducers from "./Redux/Reducers/usersReducer.js";
import flashMessageReducer from "./Redux/Reducers/flashMessageReducer.js";
import * as actionTypes from "./Redux/Actions/action-types";
import thunk from "redux-thunk";
import { setMyData } from "./Redux/Actions";
import requireAuth from "./containers/Authentication/requireAuth";
const reducers = combineReducers({
  admin: adminReducer,
  supervisor: supervisorReducer,
  user: usersReducers,
  flashMessageReducer
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

const store = createStore(
  reducers,
  composedEnhancers(applyMiddleware(logger, thunk))
);
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(
    setMyData(actionTypes.SET_CURRENT_USER, jwtDecode(localStorage.jwt))
  );
}
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin" component={requireAuth(Admin)} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </Provider>,
  //
  document.getElementById("root")
);
