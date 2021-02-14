const data = (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_AUTH": {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default data;
