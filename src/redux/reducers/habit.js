import { combineReducers } from "redux";

const id = (state = [], { type, payload }) => {
  switch (type) {
    case "LOGIN_LOAD_HABIT_IDS":
      return payload;
    default: {
      return state;
    }
  }
};

const habit_done_records = (state = {}, { type, payload }) => {
  switch (type) {
    case "LOGIN_LOAD_HABITS_RECORDS":
      return payload;
      break;
    case "ADD_HABIT_RECORD":
      const { id:addID, date:addRecordDAte } = payload;
      if (state[addID]) {
        return { ...state, [addID]: [...state[addID], addRecordDAte] };
      }

      return { ...state, [addID]: [addRecordDAte] };
    case "DELETE_HABIT_RECORD":
      const { id:habitID, date:recordDAte } = payload;
      if (state[habitID]) {
        return { ...state, [habitID]: state[habitID].filter((item) => item != recordDAte) };
      }

      return state;
    default: {
      return state;
    }
  }
};

export default combineReducers({
  id,
  habit_done_records,
});
