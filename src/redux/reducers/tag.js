import { combineReducers } from "redux";

const id = (state = [], { type, payload }) => {
  switch (type) {
    case "LOGIN_LOAD_TAG_IDS":
        return payload;
    case 'LOGOUT':
        return []; 
    default: {
      return state;
    }
  }
};

export default combineReducers({
  id,
});
