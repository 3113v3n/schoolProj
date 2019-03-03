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
