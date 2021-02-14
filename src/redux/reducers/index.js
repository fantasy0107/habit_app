import { combineReducers } from "redux";
import auth from "./auth";
import target from "./target";
import db from "./db";
import topic from "./topic";

export default combineReducers({ auth, target, db, topic });
