import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  redirect: false,
  data: null,
  isLoading: false,
  error: false,
  project: [{ projectCode: "", projectName: "", trimesters: 0 }],
  student: [{ projectCode: "", admNo: "", name: "", date: new Date() }],
  supervisorDetails: [
    {
      staffId: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPass: "",
      courseSelected: ""
    }
  ]
};

function adminReducer(state = initialState, action) {
  switch (action.type) {
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
    case actionTypes.ADD_PROJECT:
      return {
        project: [action.projectDetails, ...state.project]
      };
    case actionTypes.ADD_STUDENTS:
      return updateProgress(state, {
        student: [action.studentDetails, ...state.student]
      });
    case actionTypes.UPDATE_ADMIN_PROFILE:
      return updateProgress(state, {
        supervisorDetails: [
          action.supervisorDetails,
          ...state.supervisorDetails
        ]
      });

    default:
      return state;
  }
}

export default adminReducer;
