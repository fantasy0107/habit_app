import { Facebook } from "@material-ui/icons";
import { Icon } from "@material-ui/core";

import { useRef, useState } from "react";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../config/api";

const LoginScreen = (props) => {
  const email = useRef("");
  const password = useRef("");
  const [open, setOpen] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();

  const clickLogIn = () => {
    api
      .post("login", {
        email: email.current,
        password: password.current,
      })
      .then(({ data }) => {
        const { user } = data;
        console.log("user", user);
        dispatch({
          type: "SET_AUTH",
          payload: user,
        });

        const token = user.user_token.value;

        localStorage.setItem("token", `Bearer ${token}`);

        history.push("home");
      })
      .catch((error) => {
        console.log("error", error);

        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeEmail = (event) => {
    email.current = event.target.value;
  };
  const changePassword = (event) => {
    password.current = event.target.value;
  };

  const responseFacebook = (response) => {
    const { accessToken } = response;

    console.log(response);

    api
      .post("login/facebook", {
        token: accessToken,
      })
      .then(({ data }) => {
        const { user } = data;
        dispatch({
          type: "SET_AUTH",
          payload: user,
        });

        const token = user.user_token.value;

        localStorage.setItem("token", `Bearer ${token}`);

        history.push("home");
      })
      .catch((error) => {
        console.log("error", error);

        setOpen(true);
      });
  };
  const responseGoogle = (response) => {
    console.log(response);
    const { accessToken } = response;

    api
      .post("login/google", {
        token: accessToken,
      })
      .then(({ data }) => {
        const { user } = data;
        dispatch({
          type: "SET_AUTH",
          payload: user,
        });

        const token = user.user_token.value;

        localStorage.setItem("token", `Bearer ${token}`);

        history.push("home");
      })
      .catch((error) => {
        console.log("error", error);

        setOpen(true);
      });
  };
  const componentClicked = () => {
    console.log("Clicked!");
  };
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-red-900  ">header</div>

      <div className=" flex-grow flex flex-row ">
        <div className="w-1/4">left sidebar</div>
        <div className="flex-grow justify-center p-5 bg-white">
          <div className="text-5xl">Habit</div>
          <div className="text-2xl">Sign in/Create account</div>

          <FacebookLogin
            appId="1088597931155576"
            autoLoad={false}
            onClick={componentClicked}
            callback={responseFacebook}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className="bg-black text-white p-3 rounded-md w-full"
              >
                <Facebook />
                Continue with Facebook
              </button>
            )}
          />
          <div className=" h-1" />

          <GoogleLogin
            clientId="794749865058-47dog279hhjn6c9pcq515lqvcqj71h34.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            isSignedIn={false}
            render={(renderProps) => (
              <button
                onClick={() => {
                  console.log(123);
                  // renderProps.onClick();
                }}
                className="bg-black text-white p-3 rounded-md w-full"
                disabled={renderProps.disabled}
              >
                Continue with Google
              </button>
            )}
          />
          <a>Forgot password?</a>
        </div>
        <div className="w-1/4">right sidebar</div>
      </div>
      <div>footer</div>
    </div>
  );
};

export default LoginScreen;
