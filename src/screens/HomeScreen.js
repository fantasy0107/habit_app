import React from "react";
import get from "lodash/get";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";

const HomeScreen = () => {
  const name = useSelector((state) => get(state, "auth.name", "default"));
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogoutSuccess = () => {
    console.log('onLogoutSuccess');

  };
  const onFailure = () => {
    console.log('onFailure');
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
      type: "SET_AUTH_LOGOUT",
      payload: null,
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-200 p-3">sideBar</div>
      <div className=" flex-1">
        <div>Home</div>
        <div>{name}</div>
        <div>
          <button onClick={logout}>logout</button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
