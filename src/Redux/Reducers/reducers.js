import { ADD_STUDENTS } from "../Actions/action-types";
import { ADD_SUPERVISOR } from "../Actions/action-types";
import { ADD_PROJECT } from "../Actions/action-types";

const initialState = { user: [], project: [], students: [], redirect: true };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STUDENTS:
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
    case ADD_SUPERVISOR:
      return {
        ...state,
        user: state.user.concat({
          userId: state.staffId,
          userPass: state.password
        }),
        redirect: (state.redirect= true)
      };
    case ADD_PROJECT:
      return {
        ...state,
        projId: state.project.projId,
        projName: state.project.name,
        projCode: state.project.code
      };
  }
  return state;
}

export default rootReducer;
