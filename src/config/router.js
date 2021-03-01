import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import TargetItemScreen from "../screens/TargetItemScreen";
import TopicScreen from "../screens/TopicScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TargetCreateScreen from "../screens/TargetCreateScreen";
import TopicCreateScreen from "../screens/TopicCreateScreen";
import TopicItemScreen from "../screens/TopicItemScreen";

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <HomeScreen />
        </Route>
        <Route exact path="/target_create">
          <TargetCreateScreen />
        </Route>
        <Route exact path="/target_item/:target_item">
          <TargetItemScreen />
        </Route>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route exact path="/topic/:id">
          <TopicItemScreen />
        </Route>
        <Route exact path="/topic">
          <TopicScreen />
        </Route>
        <Route exact path="/profile">
          <ProfileScreen />
        </Route>
        <Route exact path="/topic_create">
          <TopicCreateScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routers;
