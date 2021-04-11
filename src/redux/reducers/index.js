import { combineReducers } from "redux";
import auth from "./auth";
import db from "./db";
import habits from "./habits";

export default combineReducers({ auth, db, habits });
