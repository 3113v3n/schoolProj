import * as actionTypes from "../Actions/action-types"; ///import all actions
import { updateProgress } from "../utilityFunctions";

const initialState = {
  data: null,
  supervisorDetails: [
    {
      staffId: "6r6r7612e",
      email: "basub@gmail.com",
      firstName: "Sidney",
      lastName: "Omondi",
      password: "#cc8g92 xjkb89",
      confirmPass: "#cc8g92 xjkb89",
      courseSelected: "diploma"
    }
  ],
  error: false,
  isLoading: false
};

function supervisorReducer(state = initialState, action) {
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
    case actionTypes.ADD_SUPERVISOR:
      return updateProgress(state, {
        staffId: action.staffId,
        password: action.password,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        confirmPass: action.confirmPass,
        courseSelected: action.courseSelected
      });
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        staffId: action.user.staffId,
        password: action.user.password
      };

    default:
      return state;
  }
}

export default supervisorReducer;
