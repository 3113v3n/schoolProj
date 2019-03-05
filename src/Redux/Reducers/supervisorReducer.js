import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  mydata: null,
  supervisorDetails: [],
  goBack: false,
  progress: [],
  error: false,
  isLoading: false
};

function supervisorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MY_DATA:
      return updateProgress(state, {
        myData: action.data,
        isLoading: true,
        error: false
      });
    case actionTypes.FETCHING_FAILED:
      return {
        ...state,
        error: true
      };
    case actionTypes.EDIT_PROGRESS:
      return {
        progress: [action.data, ...state.progress],
        goBack: true
      };
    case actionTypes.UPDATE_SUPERVISOR_PROFILE:
      return {
        supervisorDetails: [action.data, ...state.supervisorDetails]
      };

    default:
      return state;
  }
}

export default supervisorReducer;
