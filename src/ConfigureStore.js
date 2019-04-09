import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import adminReducer from "./Redux/Reducers/adminReducer";
import supervisorReducer from "./Redux/Reducers/supervisorReducer";
import usersReducers from "./Redux/Reducers/usersReducer";
import editTableReducers from "./Redux/Reducers/editTableReducers";
import errorReducers from "./Redux/Reducers/errorReducers";
import countReducers from "./Redux/Reducers/countReducers";
import middleware from "./Redux/middleware";
import accessTokenReducer from "./Redux/Reducers/tokenReducer";
import { reducer as refreshReducer } from "redux-refresh-token";
import thunk from "redux-thunk";

const ConfigureStore = () => {
  const reducers = combineReducers({
    admin: adminReducer,
    supervisor: supervisorReducer,
    user: usersReducers,
    edit: editTableReducers,
    error: errorReducers,
    count: countReducers,
    token: accessTokenReducer,
    tokenRefresh: refreshReducer
  });
  const composedEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducers,
    composedEnhancers(applyMiddleware(thunk, middleware, createLogger()))
  );
};
export default ConfigureStore;
