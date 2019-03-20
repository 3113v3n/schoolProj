import * as actionTypes from "../Actions/action-types";

const initialState = {
  allocatedCount: 2,
  supervisorCount: 10,
  oneTrimesterCount: 7,
  twoTrimesterCount: 5
};

export default function countReducers(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.STUDENT_COUNT:
      return {
        ...state,
        allocatedCount: state.allocatedCount //action.data
      };
    case actionTypes.SUPERVISOR_COUNT:
      return{
        ...state,
        supervisorCount: state.supervisorCount
      }
    case actionTypes.ONE_TRIMESTER_STUDENTS:
      return{
        ...state,
        oneTrimesterCount: state.oneTrimesterCount
      }
    case actionTypes.TWO_TRIMESTER_STUDENTS:
      return{
        ...state,
        twoTrimesterCount: state.twoTrimesterCount
      }
    default:
      return state;
  }
}
