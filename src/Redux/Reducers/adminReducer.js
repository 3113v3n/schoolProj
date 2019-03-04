import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  redirect: true,
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
        ...state,
        projCode: action.projectCode,
        projName: action.projectName,
        trimesters: state.trimesters + 2
      };
    case actionTypes.ADD_STUDENTS:
      return updateProgress(state, {
        projectCode: action.projectCode,
        admNo: action.admNo,
        studentName: action.studentName,
        date: new Date()
      });
    case actionTypes.UPDATE_PROFILE:
      return updateProgress(state, {
        staffId: action.staffId,
        password: action.password,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        confirmPass: action.confirmPass,
        courseSelected: action.courseSelected
      });

    default:
      return state;
  }
}

export default adminReducer;
