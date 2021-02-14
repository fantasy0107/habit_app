import { combineReducers } from "redux";

const id = (state = [], { type, payload }) => {
  switch (type) {
    case "TARGET_FILL":
      return payload;
    default: {
      return state;
    }
  }
};

export default combineReducers({
  id,
});
