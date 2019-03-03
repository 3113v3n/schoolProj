import * as actionTypes from "../Actions/action-types"; ///import all actions

const initialState = { project: [] };

function ProjectReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return {
        ...state,
        projId: state.project.projId,
        projName: state.project.name,
        projCode: state.project.code
      };
    default:
      return state;
  }
}

export default ProjectReducer;
