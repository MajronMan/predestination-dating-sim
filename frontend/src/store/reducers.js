import { combineReducers } from "redux";
import { USER_LOGIN, USER_LOGOUT } from "./actions";

function user(state = null, action) {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
