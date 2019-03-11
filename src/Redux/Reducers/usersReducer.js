import * as actionTypes from "../Actions/action-types";
import isEmpty from "lodash/isEmpty";
const initialState = {
  users: [],
  redirect: false,
  user: {},
  isAuthenticated: false,
  role: "Admin",
  token: " "
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEW_USER:
      return {
        users: [action.data, ...state.users],
        redirect: true,
        role: state.role
      };
    case actionTypes.SET_ROLE:
      return {
        role: action.data //response from db
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        user: state.users.filter(user => user.data !== action.data)
      };
    case actionTypes.NEW_USER_FAILURE:
      return {
        ...state,
        error: true
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        user: action.data
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.data),
        user: action.data,
        redirect: true,
        role: state.role
      };
    case actionTypes.STORE_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case actionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        redirect: true
      };
    default:
      return state;
  }
}

export default userReducer;
