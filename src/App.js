import "./App.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/home">
            <HomeScreen />
          </Route>
          <Route path="/">
            <LoginScreen />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
