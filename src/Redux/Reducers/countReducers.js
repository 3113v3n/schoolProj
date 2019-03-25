import * as actionTypes from "../Actions/action-types";

const initialState = {
  allocatedCount: 0,
  supervisorCount: 0,
  degreeCount: 0,
  diplomaCount: 0
};

export default function countReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.STUDENT_COUNT:
      return {
        ...state,
        allocatedCount: action.data //action.data
      };
    case actionTypes.SUPERVISOR_COUNT:
      return {
        ...state,
        supervisorCount: action.data
      };
    case actionTypes.DEGREE_STUDENTS:
      return {
        ...state,
        degreeCount: action.data
      };
    case actionTypes.DIPLOMA_STUDENTS:
      return {
        ...state,
        diplomaCount: action.data
      };
    default:
      return state;
  }
}
