//import { loadFromStorage, saveToStorage } from "./services/requests";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import adminReducer from "./Redux/Reducers/adminReducer";
import supervisorReducer from "./Redux/Reducers/supervisorReducer";
import usersReducers from "./Redux/Reducers/usersReducer";
import editTableReducers from "./Redux/Reducers/editTableReducers";
import errorReducers from "./Redux/Reducers/errorReducers";
import countReducers from "./Redux/Reducers/countReducers";
import thunk from "redux-thunk";

const ConfigureStore = () => {
  // const persistedState = loadFromStorage();
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
    // persistedState,
    composedEnhancers(applyMiddleware(thunk))
  );

  // store.subscribe(() => {
  //   saveToStorage(store.getState().user.token);
  // });
  return store;
};
export default ConfigureStore;
