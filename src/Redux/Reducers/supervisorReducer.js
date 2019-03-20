import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  myData: null,
  supervisorDetails: {},
  progress: {},
  isLoading: false,
  completed: false,
  status: "success"
};

function supervisorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MY_DATA:
      return updateProgress(state, {
        myData: action.data,
        isLoading: !state.isLoading,
        error: state.error
      });

    case actionTypes.EDIT_PROGRESS:
      return {
        ...state,
        progress: action.data,
        status: state.status
      };
    case actionTypes.UPDATE_SUPERVISOR_PROFILE:
      return {
        ...state,
        supervisorDetails: action.data,
        status: state.status
      };
    case actionTypes.MARK_AS_COMPLETED:
      return{
        ...state,
        completed: !state.completed,
        status: state.status
      };
    default:
      return state;
  }
}

export default supervisorReducer;
