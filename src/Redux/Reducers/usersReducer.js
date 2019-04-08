import * as actionTypes from "../Actions/action-types";
const initialState = {
  isAuthenticated: false,
  role: "",
  users: [],
  redirect: false,
  status: "",
  isLoading: false,
  token: null
};

function userReducer(state = initialState, action) {
  switch (action.type) {
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
        status: action.data.status,
        isAuthenticated: true,
        role: action.data.role
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
    default:
      return state;
  }
}

export default userReducer;
