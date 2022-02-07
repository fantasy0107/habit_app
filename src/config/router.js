import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import DailyScreen from "../screens/DailyScreen";
import MonthlyScreen from "../screens/MonthlyScreen";
import HabitsScreen from "../screens/HabitsScreen";
import LabelsScreen from "../screens/LabelsScreen";
import SingleHabitsScreen from "../screens/SingleHabitsScreen";

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        {/* <Route exact path="/home">
          <HomeScreen />
        </Route> */}
        <Route exact path="/daily">
          <DailyScreen />
        </Route>
        <Route exact path="/monthly">
          <MonthlyScreen />
        </Route>
        <Route exact path="/habits">
          <HabitsScreen />
        </Route>
        <Route exact path="/habits/:id">
          <SingleHabitsScreen />
        </Route>
        <Route exact path="/labels">
          <LabelsScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routers;
