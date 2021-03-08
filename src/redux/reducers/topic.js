import { combineReducers } from "redux";

const id = (state = [], { type, payload }) => {
  switch (type) {
    case "TOPIC_FILL":
      return payload;
    default: {
      return state;
    }
  }
};

const tagID = (state = [], { type, payload }) => {
  switch (type) {
    case "TAG_FILL":
      return payload;
    case "TAG_ADD":
      return [payload, ...state];
    default: {
      return state;
    }
  }
};

export default combineReducers({
  id,
  tagID,
});
