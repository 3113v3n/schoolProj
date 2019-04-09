import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  myData: null,
  Progress: null,
  progress: {},
  isLoading: false,
  completed: false,
  status: "",
  message: ""
};

function supervisorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MY_DATA:
      return updateProgress(state, {
        myData: action.data,
        isLoading: true
      });
    case actionTypes.SUPERVISOR_STATUS:
      return {
        status: action.data
      };
    case actionTypes.ADD_PROGRESS:
      return {
        status: action.data.status,
        message: action.data.message
      };
    case actionTypes.EDIT_PROGRESS:
      return {
        ...state,
        progress: action.data,
        status: action.data.status,
        message: action.data.message
      };
    case actionTypes.CHANGE_SUPERVISOR_PASSWORD:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message
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
        status: action.data.status,
        message: action.data.message
      };
    default:
      return state;
  }
}

export default supervisorReducer;
