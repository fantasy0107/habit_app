import { combineReducers } from "redux";
import auth from "./auth";
import db from "./db";
import habit from "./habit";
import tag from "./tag";

const appReducer = combineReducers({ auth, db, habit, tag })

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'USER_LOGGED_OUT') {
      state = undefined;
    }
  
    return appReducer(state, action);
  };

export default rootReducer;
