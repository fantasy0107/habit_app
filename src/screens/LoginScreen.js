import { Facebook } from "@material-ui/icons";
import { Icon, TextField } from "@material-ui/core";
import { useRef, useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../config/api";

const LoginScreen = (props) => {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const [open, setOpen] = useState(false);
  let history = useHistory();
  const [tab, setTab] = useState(0);
  const [signTab, setSingTab] = useState(0);
  const dispatch = useDispatch();

  console.log({ object: history, tab });

  const responseFacebook = (response) => {
    const { accessToken } = response;

    console.log({ response });

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

  const handleNameChange = (event) => {
    name.current = event.target.value;
    console.log("name", event.target.value);
  };
  const handleEmailChange = (event) => {
    email.current = event.target.value;
    console.log("email", event.target.value);
  };
  const handlePasswordChange = (event) => {
    password.current = event.target.value;
    console.log("password", event.target.value);
  };

  const registerAccount = () => {
    api
      .post("register", {
        name: name.current,
        email: email.current,
        password: password.current,
        password_confirmation: password.current,
      })
      .then(({ data }) => {
        console.log("data registerAccount", data);

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
        console.log("error", {
          error,
          response:error.response
        });
      });
  };
  const loginByEmail = () => {
    api
      .post("login", {
        email: email.current,
        password: password.current,
      })
      .then(({ data }) => {
        console.log("data loginByEmail", data);

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
      });
  };

  console.log("tab", tab);
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="h-10"></div>

      <div className=" flex-grow flex flex-row ">
        <div className="w-1/4"></div>

        {tab == 0 && (
          <div className="justify-center p-5 bg-white wl-full">
            <div className="text-5xl">Habit</div>
            <div className="text-2xl">Sign in/Create account</div>

            <FacebookLogin
              appId="727049798184350"
              autoLoad={false}
              fields="name,email,picture"
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
              onFailure={() => {
                console.log('Google Login Fail');
              }}
              cookiePolicy={"single_host_origin"}
              isSignedIn={false}
              autoLoad={false}
              render={(renderProps) => (
                <button
                  onClick={() => {
                    console.log("Login");
                    renderProps.onClick();
                  }}
                  className="bg-black text-white p-3 rounded-md w-full"
                  disabled={renderProps.disabled}
                >
                  Continue with Google
                </button>
              )}
            />
            <div className=" h-1" />
            <button
              onClick={() => {
                console.log("onClick");
                setTab(1);
              }}
              className="bg-black text-white p-3 rounded-md w-full"
            >
              Continue with Email and Password
            </button>
            <a>Forgot password?</a>
          </div>
        )}

        {tab == 1 && (
          <div className="h-screen bg-white flex flex-col w-full p-2">
            <div className="flex flex-row">
              <button
                className={`flex-1 hover:bg-gray-300 ${
                  signTab == 0 ? "border-b-2" : ""
                } `}
                onClick={() => {
                  setSingTab(0);
                }}
              >
                Sign in
              </button>
              <button
                className={`flex-1 hover:bg-gray-300 ${
                  signTab == 1 ? "border-b-2" : ""
                }`}
                onClick={() => {
                  setSingTab(1);
                }}
              >
                Create
              </button>
            </div>
            {signTab == 0 && (
              <div>
                <TextField
                  className="w-full"
                  id="standard-basic"
                  label="Email address"
                  onChange={handleEmailChange}
                />

                <TextField
                  className="w-full "
                  id="standard-basic"
                  label="Password"
                  onChange={handlePasswordChange}
                />

                <button
                  className="w-full p-3 bg-black text-white  rounded  shadow-sm mt-1 hover:opacity-80"
                  onClick={loginByEmail}
                >
                  Sign in
                </button>
              </div>
            )}
            {signTab == 1 && (
              <div>
                <div>
                  <TextField
                    className="w-full"
                    id="standard-basic"
                    label="Name"
                    onChange={handleNameChange}
                  />
                </div>
                <div>
                  <TextField
                    className="w-full"
                    id="standard-basic"
                    label="Email address"
                    onChange={handleEmailChange}
                  />
                </div>
                <div>
                  <TextField
                    className="w-full"
                    id="standard-basic"
                    label="Password"
                    onChange={handlePasswordChange}
                  />
                </div>
                <button
                  className="w-full p-3 bg-black text-white  rounded  shadow-sm mt-1 hover:opacity-80"
                  onClick={registerAccount}
                >
                  Create
                </button>
              </div>
            )}
          </div>
        )}

        <div className="w-1/4"></div>
      </div>

      <div className="h-10"></div>
    </div>
  );
};

export default LoginScreen;
