import axios from "axios";

import pic from "../images/p81Eh87.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Fab,
} from "@material-ui/core";
import { get } from "lodash";
import { DB_FILL } from "../redux/actionTypes";
import { useHistory } from "react-router-dom";
import { steps } from "../config/gameRules";
import AddIcon from "@material-ui/icons/Add";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost/"
      : "https://dodog.org/";

  const [value, setValue] = useState("home");
  const token = useSelector((state) =>
    get(state, ["auth", "user_token", "value"], "")
  );
  const targets = useSelector((state) => get(state, ["target", "id"], []));

  useEffect(() => {
    axios
      .get(API_URL + "api/targets", {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then(({ data }) => {
        if (data.db) {
          dispatch({
            type: DB_FILL,
            payload: data.db,
          });
        }

        dispatch({
          type: "TARGET_FILL",
          payload: data.targets,
        });
      })
      .catch((response) => {});
  }, [API_URL, dispatch, token]);

  return (
    <div className="flex flex-col flex-1">
      <div className=" flex-grow">
        <List>
          {targets.length > 0 &&
            targets.map((item) => {
              return <TargetItemCard key={item} id={item} />;
            })}
        </List>
        <div className="my-3" />
      </div>
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("target_create");
          }}
        >
          <AddIcon />
        </Button>
      </div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          console.log("object", newValue);
          setValue(newValue);

          history.push(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Home" value="home" />
        <BottomNavigationAction label="Topic" value="topic" />
        <BottomNavigationAction label="Profile" value="profile" />
      </BottomNavigation>
    </div>
  );
};

const TargetItemCard = ({ id }) => {
  const history = useHistory();
  const { name = "", step = 0, updated_at_datetime = "" } = useSelector(
    (state) => {
      return get(state, ["db", "target", id], {});
    }
  );

  const { content = "", stage = "" } = get(steps, [step, "groups"], {});

  return (
    <ListItem
      button
      divider
      onClick={() => {
        history.push("target_item/" + id);
      }}
    >
      <ListItemAvatar>
        <Avatar src={pic} />
      </ListItemAvatar>
      <ListItemText
        id={id}
        primary={
          <div className="flex justify-between">
            <Typography>{name}</Typography>
            <Typography>{step}</Typography>
            <Typography>{updated_at_datetime}</Typography>
          </div>
        }
        secondary={
          <>
            <Typography>{content}</Typography>
            <Typography>{stage}</Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default HomeScreen;
