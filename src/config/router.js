import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
} from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { get } from "lodash";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";

const Routers = () => {
  const token = useSelector((state) => get(state, "auth.user_token.value"));

  if (!token) {
    return <LoginScreen />;
  }

  const menus = [
    {
      title: "TRACK",
      items: [
        {
          title: "Habit",
          icon: "",
        },
      ],
    },
  ];

  return (
    <Router>
      <Drawer variant="persistent" anchor="left" open={true}>
        <List>
          <ListItem>
            <Link to="home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>home</ListItemText>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/">login</Link>
          </ListItem>
        </List>
      </Drawer>

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
