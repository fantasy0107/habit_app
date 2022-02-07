import { combineReducers } from "redux";
import { DB_FILL, DB_UPDATE_RECORD } from "../actionTypes";
import get from "lodash/get";

const habits = (state = {}, { type, payload }) => {
  switch (type) {
    case DB_FILL:
      if (get(payload, "habits", {})) {
        return { ...state, ...payload.habits };
      }

      return state;
    default: {
      return state;
    }
  }
};

const tags = (state = {}, { type, payload }) => {
  switch (type) {
    case DB_FILL:
      if (get(payload, "tags", {})) {
        return { ...state, ...payload.tags };
      }

      return state;
    default: {
      return state;
    }
  }
};

export default combineReducers({
  habits,
  tags,
});
