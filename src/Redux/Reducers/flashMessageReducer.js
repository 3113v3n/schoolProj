import * as actionTypes from "../Actions/action-types";
import shortid from "shortid";
function flashMessageReducer(state = [], action = {}) {
  switch (action.type) {
    case actionTypes.ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          message: action.message.text
        }
      ];
    default:
      return state;
  }
}

export default flashMessageReducer;
