import * as actionTypes from "../Actions/action-types"; ///import all actions

const initialState = { user: [], redirect: false };

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEW_USER:
      const newUser = {
        staffId: action.userDetails.staffId,
        password: action.userDetails.password
      };
      return {
        ...state,
        user: state.user.concat(newUser)
      };
    case actionTypes.ADD_SUPERVISOR:
      return {
        ...state,
        user: state.user.concat({
          staffId: state.staffId,
          password: state.password
        })
      };

    default:
      return state;
  }
}

export default LoginReducer;
