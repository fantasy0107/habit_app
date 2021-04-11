import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route exact path="/home">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routers;
