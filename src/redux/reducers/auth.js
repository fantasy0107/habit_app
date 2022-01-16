const data = (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_AUTH": {
      return payload;
    }

    case "SET_AUTH_LOGOUT": {
      return null;
    }

    default: {
      return state;
    }
    
  }
};

export default data;
