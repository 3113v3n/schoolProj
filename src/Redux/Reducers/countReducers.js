import * as actionTypes from "../Actions/action-types";

const initialState = {
  allocatedCount: 2,
  supervisorCount: 10,
  degreeCount: 7,
  diplomaCount: 5
};

export default function countReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.STUDENT_COUNT:
      return {
        ...state,
        allocatedCount: state.allocatedCount //action.data
      };
    case actionTypes.SUPERVISOR_COUNT:
      return {
        ...state,
        supervisorCount: state.supervisorCount
      };
    case actionTypes.DEGREE_STUDENTS:
      return {
        ...state,
        degreeCount: state.degreeCount
      };
    case actionTypes.DIPLOMA_STUDENTS:
      return {
        ...state,
        diplomaCount: state.diplomaCount
      };
    default:
      return state;
  }
}
