import Brightness5Icon from "@mui/icons-material/Brightness5";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import api from "../config/api";
import { DB_FILL } from "../redux/actionTypes";

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const SignInContainer = (props) => {
  const token = localStorage.getItem("token");
  const hoverColor = "hover:bg-gray-300";
  const history = useHistory();
  const dispatch = useDispatch();
  let location = useLocation();

  let query = useQuery();

  const apiToken = query.get("api_token");
  useEffect(() => {
    if (apiToken) {
      api
        .post("login/token", {
          api_token: apiToken,
        })
        .then(({ data }) => {
          setReducerData(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }

    return;
  }, [apiToken]);

  console.log("apiToken", apiToken);

  const setReducerData = (data) => {
    const { user, db, habit_ids, tag_ids, habit_records } = data;

    dispatch({
      type: "SET_AUTH",
      payload: user,
    });

    if (db) {
      dispatch({
        type: DB_FILL,
        payload: db,
      });
    }

    if (habit_records) {
      dispatch({
        type: "LOGIN_LOAD_HABITS_RECORDS",
        payload: habit_records,
      });
    }

    if (habit_ids) {
      dispatch({
        type: "LOGIN_LOAD_HABIT_IDS",
        payload: habit_ids,
      });
    }

    if (tag_ids) {
      dispatch({
        type: "LOGIN_LOAD_TAG_IDS",
        payload: tag_ids,
      });
    }

    const token = user.api_token;

    localStorage.setItem("token", `Bearer ${token}`);

    history.push("daily");
  };

  return (
    <div className={`h-screen flex justify-center`}>
      {token == null ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <div
          className={`flex ${
            location.pathname == "/monthly" ? "flex-1" : "w-9/12"
          } `}
        >
          <div className="p-3 w-1/5 bg-gray-200">
            <ul>
              {/* <li className={`${hoverColor}`}>
                <button
                  onClick={() => {
                    history.push("home");
                  }}
                >
                  <HomeIcon />
                  Home
                </button>
              </li> */}
              <li className={`${hoverColor}`}>
                <button
                  onClick={() => {
                    history.push("daily");
                  }}
                >
                  <Brightness5Icon />
                  Daily
                </button>
              </li>
              <li className={`${hoverColor}`}>
                <button
                  onClick={() => {
                    history.push("monthly");
                  }}
                >
                  <DateRangeIcon />
                  Monthly
                </button>
              </li>
              <li className={`${hoverColor}`}>
                <button
                  onClick={() => {
                    history.push("habits");
                  }}
                >
                  <DashboardIcon />
                  Habits
                </button>
              </li>
              <li className={`${hoverColor}`}>
                <button
                  onClick={() => {
                    history.push("labels");
                  }}
                >
                  <LocalOfferIcon />
                  labels
                </button>
              </li>
            </ul>
          </div>
          <div className="overflow-scroll w-4/5 bg-white">{props.children}</div>
        </div>
      )}
    </div>
  );
};

export default SignInContainer;
