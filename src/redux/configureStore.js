// configureStore.js

import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger();

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(logger));
  let persistor = persistStore(store);
  return { store, persistor };
};
