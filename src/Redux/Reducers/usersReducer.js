import * as actionTypes from "../Actions/action-types"; ///import all actions

const initialState = {
  user: [{ staffId: "", password: "" }],
  redirect: false,
  role: "Admin"
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEW_USER:
      return {
        user: [action.data, ...state.user],
        redirect: true,
        role: state.role
      }
    case actionTypes.DELETE_USER:
      return{
        ...state,
        user: state.user.filter(user => user.staffId !== action.staffId)
      }

    default:
      return state;
  }
}

export default userReducer;
