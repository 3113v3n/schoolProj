import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  user: [{ staffId: "", password: "" }],
  redirect: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEW_USER:
      return {
        user: [action.userDetails, ...state.user],
        redirect: true
      }
    case actionTypes.SET_DATA:
      return updateProgress(state, {
        data: action.data,
        isLoading: true,
        error: false
      });
    case actionTypes.FETCHING_FAILED:
      return {
        ...state,
        error: true
      };
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
