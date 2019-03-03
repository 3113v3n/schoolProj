import * as actionTypes from "../Actions/action-types"; ///import all actions

const initialState = { students: [] };

function StudentReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_STUDENTS:
      return {
        ...state,
        students: state.students.concat({
          id: state.admNo,
          projectCode: state.projCode,
          name: state.studentName,
          date: state.dateRegistered
        }),
        redirect: state.redirect
      };

    default:
      return state;
  }
}

export default StudentReducer;
