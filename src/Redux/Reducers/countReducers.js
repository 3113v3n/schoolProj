import * as actionTypes from "../Actions/action-types";

const initialState = {
  allocatedCount: 0,
  supervisorCount: 0,
  degreeCount: 0,
  diplomaCount: 0
};

export default function countReducers(state = initialState, action) {
  if (action.type === actionTypes.DASHBOARD_COUNT) {
    return {
      ...state,
      allocatedCount: action.data.unallocated_students_count,
      supervisorCount: action.data.supervisors_count,
      degreeCount: action.data.degree_students_count,
      diplomaCount: action.data.diploma_students_count
    };
  } else {
    return state;
  }
}
