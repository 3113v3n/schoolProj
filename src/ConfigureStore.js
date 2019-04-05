import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import adminReducer from "./Redux/Reducers/adminReducer";
import supervisorReducer from "./Redux/Reducers/supervisorReducer";
import usersReducers from "./Redux/Reducers/usersReducer";
import editTableReducers from "./Redux/Reducers/editTableReducers";
import errorReducers from "./Redux/Reducers/errorReducers";
import countReducers from "./Redux/Reducers/countReducers";
import { createEpicMiddleware } from "redux-observable";
import { rootEpics } from "./Redux/Epics/rootEpics";
import thunk from "redux-thunk";
const epicMiddleware = createEpicMiddleware();
const ConfigureStore = () => {
  const reducers = combineReducers({
    admin: adminReducer,
    supervisor: supervisorReducer,
    user: usersReducers,
    editTable: editTableReducers,
    error: errorReducers,
    count: countReducers
  });
  const composedEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    composedEnhancers(applyMiddleware(thunk, epicMiddleware))
  );
  epicMiddleware.run(rootEpics);
  return store;
};
export default ConfigureStore;
