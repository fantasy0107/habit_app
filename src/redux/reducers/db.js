import { DB_FILL, DB_UPDATE_RECORD } from "../actionTypes";

const db = (state = {}, { type, payload }) => {
  switch (type) {
    case DB_FILL: {
      const deepCopyDB = Object.assign({}, state);

      console.log("db", { state, type, payload });
      Object.keys(payload).forEach((item) => {
        if (deepCopyDB[item]) {
          deepCopyDB[item] = { ...deepCopyDB[item], ...payload[item] };
        } else {
          deepCopyDB[item] = payload[item];
        }
      });

      return deepCopyDB;
    }
    case DB_UPDATE_RECORD: {
      const deepCopyDB = Object.assign({}, state);
      const { key, id, value } = payload;

      deepCopyDB[key][id] = { ...deepCopyDB[key][id], ...value };

      return deepCopyDB;
    }
    default: {
      return state;
    }
  }
};

export default db;
