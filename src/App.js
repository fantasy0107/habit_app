import "./App.css";
// import store from "./redux/store";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import Router from "./config/router";

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
