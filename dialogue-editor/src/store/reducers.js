import { combineReducers } from "redux";
import * as actions from "./actions";

function user(state = null, action) {
  switch (action.type) {
    case actions.USER_LOGIN:
      return action.payload;
    case actions.USER_LOGOUT:
      return null;
    default:
      return state;
  }
}

function backend(state = { response: null, error: null }, action) {
  switch (action.type) {
    case actions.SERVER_RESPONSE:
      return { ...state, error: null, response: action.payload };
    case actions.SERVER_ERROR:
      return { ...state, error: action.payload, response: null };
    default:
      return state;
  }
}
 

function dialogue(state = { response: null, error: null }, action) {
  switch (action.type) {
    case actions.GOT_DIALOGUE:
      return { ...state, error: null, response: action.payload };
    case actions.DIALOGUE_ERROR:
      return { ...state, error: action.payload, response: null };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  backend, 
  dialogue
});

export default rootReducer;
