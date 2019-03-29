import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  myData: null,
  Progress: null,
  supervisorDetails: {},
  progress: {},
  isLoading: false,
  completed: false,
  status: "",
  message: ""
};

function supervisorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SUCCESS_MESSAGE: {
      return {
        ...state,
        message: action.data
      };
    }
    case actionTypes.SET_MY_DATA:
      return updateProgress(state, {
        myData: action.data,
        isLoading: true
      });
    case actionTypes.SUPERVISOR_STATUS:
      return {
        status: action.data
      };
    case actionTypes.EDIT_PROGRESS:
      return {
        ...state,
        progress: action.data,
        status: state.status
      };
    case actionTypes.CHANGE_SUPERVISOR_PASSWORD:
      return {
        ...state,
        message: action.data
      };
    case actionTypes.FETCH_PROGRESS:
      return updateProgress(state, {
        Progress: action.data,
        isLoading: true
      });
    case actionTypes.MARK_AS_COMPLETED:
      return {
        ...state,
        completed: true,
        status: action.data
      };
    default:
      return state;
  }
}

export default supervisorReducer;
