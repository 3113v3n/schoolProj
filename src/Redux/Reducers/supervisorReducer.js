import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  mydata: null,
  supervisorDetails: [
    {
      staffId: "6r6r7612e",
      email: "basub@gmail.com",
      password: "#cc8g92 xjkb89",
      confirmPass: "#cc8g92 xjkb89",
    }
  ],
  progress: [{ admNo: "", documentSubmited: [], comments: "", marks: "" }],
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
      return{
        progress: [action.progressDetails, ...state.progress]
      };
    case actionTypes.UPDATE_SUPERVISOR_PROFILE:
      return {
        supervisorDetails: [
          action.supervisorDetails,
          ...state.supervisorDetails
        ]
      };

    default:
      return state;
  }
}

export default supervisorReducer;
