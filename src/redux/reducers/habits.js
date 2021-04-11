import { combineReducers } from "redux";

const id = (state = [], { type, payload }) => {
  switch (type) {
    case "HABIT_INIT":
      return payload;
    case "HABIT_ADD":
      return [...payload, ...state];
    case "HABIT_DELETE":
      return state.filter((habit) => {
        return habit != payload;
      });

    default: {
      return state;
    }
  }
};

export default combineReducers({
  id,
});
