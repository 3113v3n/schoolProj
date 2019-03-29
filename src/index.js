import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// core components
import Admin from "layouts/Admin.jsx";
import "assets/css/material-dashboard-react.css?v=1.6.0";
import Login from "containers/Login/Login";
import { Provider } from "react-redux";

import requireAuth from "./HOC/requireAuth";
import ConfigureStore from "./ConfigureStore.js";

const store = ConfigureStore();

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin" component={requireAuth(Admin)} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </Provider>,
  //
  document.getElementById("root")
);

/*

ToDo: excel, edit, delete, update, messages
 */
