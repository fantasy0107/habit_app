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

export default combineReducers({
  id,
});
