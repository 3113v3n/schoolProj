const redux = require("redux");
const createStore = redux.createStore;
const initialState = {
  myCounter: 0
};
//Reducers
const rootReducer = (state = initialState, action) => {
  if (action.type === "ADD_COUNTER") {
    return {
      ...state,
      myCounter: state.myCounter + 1
    };
  }
  if (action.type === "INC_COUNTER") {
    return {
      ...state,
      myCounter: state.myCounter + action.value
    };
  }
  return state;
};
//Store
const store = createStore(rootReducer);
console.log(store.getState());

//subscription
/*Subscriptions allow for not manually calling getState
function
 */
store.subscribe(() => {
  console.log("[subscribed]", store.getState());
});
//Actions
store.dispatch({ type: "ADD_COUNTER" });
store.dispatch({ type: "INC_COUNTER", value: 15 });
console.log(store.getState());
/*
* import React from "react";
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
import * as actionTypes from "./Redux/Actions/action-types";
import thunk from "redux-thunk";
import AuthenticationComponent from "./containers/Authentication/AuthenticationComponent";
import { setMyData } from "./Redux/Actions";
import requireAuth from "./containers/Authentication/requireAuth";
const reducers = combineReducers({
  admin: adminReducer,
  supervisor: supervisorReducer,
  user: usersReducers
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
        <Route path="/auth" component={AuthenticationComponent} />
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

//
export const AddNewUser = data => {
  return dispatch => {
    return axios
      .post("/192.168.0.162:5000/test", data)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        const myToken = jwtDecode(token);
        dispatch(setMyData(actionTypes.SET_CURRENT_USER, myToken));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
  };
};
*/
