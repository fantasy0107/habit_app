import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";

const logger = createLogger();

export default createStore(rootReducer, applyMiddleware(logger));
