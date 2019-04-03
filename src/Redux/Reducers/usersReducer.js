import * as actionTypes from "../Actions/action-types";
const initialState = {
  user: {},
  isAuthenticated: false,
  role: "",
  users: [],
  redirect: false,
  status: "",
  isLoading: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEW_USER:
      return {
        users: [action.data, ...state.users],
        role: state.role
      };
    case actionTypes.SET_ROLE:
      return {
        role: action.data //response from db
      };
    case actionTypes.STATUS:
      return {
        ...state,
        status: action.data
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        user: state.users.filter(user => user.data !== action.data)
      };

    case actionTypes.GET_USER:
      return {
        ...state,
        user: action.data
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.data,
        role: state.role
      };
    case actionTypes.NOT_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };
    case actionTypes.STORE_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case actionTypes.REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.data
      };
    case actionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        redirect: !state.redirect
      };
    default:
      return state;
  }
}

export default userReducer;
