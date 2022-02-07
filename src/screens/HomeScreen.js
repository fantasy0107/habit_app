import React from "react";
import get from "lodash/get";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogout } from "react-google-login";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SignInContainer from "../containers/SignInContainer";

const HomeScreen = () => {
  const name = useSelector((state) => get(state, "auth.name", "default"));
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogoutSuccess = () => {
    console.log("onLogoutSuccess");
  };
  const onFailure = () => {
    console.log("onFailure");
  };

  const clientId =
    "794749865058-47dog279hhjn6c9pcq515lqvcqj71h34.apps.googleusercontent.com";

  const { signOut } = useGoogleLogout({
    clientId,
    onFailure,
    onLogoutSuccess,
  });

  const logout = () => {
    signOut();
    history.push("/");

    dispatch({
      type: "USER_LOGGED_OUT",
    });

    localStorage.removeItem("token");
  };

  return (
    <SignInContainer>
      <div className="flex-1">
        <div>Home</div>
        <div>{name}</div>
        <div>
          <button onClick={logout}>logout</button>
        </div>
      </div>
    </SignInContainer>
  );
};

export default HomeScreen;
