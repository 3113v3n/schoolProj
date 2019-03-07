import * as actionTypes from "../Actions/action-types"; ///import all actions

const initialState = {
  users: [{ staffId: "", password: "" }],
  redirect: false,
  user: {},
  isAuthenticated: "",
  role: "Admin"
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEW_USER:
      return {
        users: [action.data, ...state.users],
        redirect: true,
        role: state.role
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
        isAuthenticated: true,
        user: action.data
      };
    default:
      return state;
  }
}

export default userReducer;
