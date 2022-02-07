import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Alert, TextField } from "@mui/material";
import { get } from "lodash";
import { useRef, useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import api from "../config/api";
import { DB_FILL } from "../redux/actionTypes";

const LoginScreen = (props) => {
  let history = useHistory();
  const [tab, setTab] = useState(0);
  const [signTab, setSingTab] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  const dispatch = useDispatch();

  const responseFacebook = (response) => {
    const { accessToken } = response;

    console.log({ response });

    api
      .post("login/facebook", {
        token: accessToken,
      })
      .then(({ data }) => {
        setReducerData(data);
      })
      .catch((error) => {
        console.log("error", error);
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
        setReducerData(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const componentClicked = () => {
    console.log("Clicked!");
  };

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

  const LoginButtonStyle =
    "bg-black text-white p-3 rounded-md w-full hover:opacity-80 mb-2";

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full sm:w-96   ">
        {tab == 0 && ( // Facebook Login & Google Login & Email Login
          <div className="p-5 bg-white">
            <div className="text-5xl pb-3">Habit</div>
            <div className="text-3xl pb-3">Sign in/Create account</div>

            <FacebookLogin
              appId="727049798184350"
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className={LoginButtonStyle}
                >
                  <FacebookIcon />
                  Continue with Facebook
                </button>
              )}
            />

            <GoogleLogin
              clientId="794749865058-47dog279hhjn6c9pcq515lqvcqj71h34.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={() => {
                console.log("Google Login Fail");
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
                  className={LoginButtonStyle}
                  disabled={renderProps.disabled}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              )}
            />

            <button
              onClick={() => {
                console.log("onClick");
                setTab(1);
              }}
              className={LoginButtonStyle}
            >
              Continue with Email and Password
            </button>

            <Link>Forgot password?</Link>
          </div>
        )}

        {tab == 1 && ( // Sign & Create Tab
          <div className="bg-white p-5 flex flex-col">
            <div className="flex">
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
            {signTab == 0 && ( // Sign Tab Content
              <SignInBlock></SignInBlock>
            )}
            {signTab == 1 && ( // Create Tab Content
              <CreateBlock></CreateBlock>
            )}
          </div>
        )}
      </div>

      {alert.open == true && (
        <Alert
          className="absolute top-3 mx-auto"
          severity="error"
          onClose={() => {
            setAlert({
              open: false,
              message: "",
            });
          }}
        >
          {alert.message}
        </Alert>
      )}
    </div>
  );
};

const SignInBlock = () => {
  const email = useRef("");
  const password = useRef("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEmailChange = (event) => {
    email.current = event.target.value;
  };

  const handlePasswordChange = (event) => {
    password.current = event.target.value;
  };

  const loginByEmail = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    console.log("qq", {
      "mail.current": email.current,
      ddd: regex.test(email.current),
    });

    if (regex.test(email.current)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      return false;
    }

    if (password.current) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
      return false;
    }

    api
      .post("login", {
        email: email.current,
        password: password.current,
      })
      .then(({ data }) => {
        setReducerData(data);
      })
      .catch((error) => {
        console.log({ error });
        setIsAlert(true);
      });
  };

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
    <div className="flex flex-col">
      <TextField
        required
        variant="standard"
        label="Email address"
        error={emailError}
        onChange={handleEmailChange}
      />

      <TextField
        required
        variant="standard"
        label="Password"
        type="password"
        error={passwordError}
        onChange={handlePasswordChange}
      />

      <button
        className="w-full p-3 bg-black text-white  rounded  shadow-sm mt-1 hover:opacity-80"
        onClick={loginByEmail}
      >
        Sign in
      </button>

      {isAlert == true && (
        <Alert
          className="absolute top-3 mx-autol"
          severity="error"
          onClose={() => {
            setIsAlert(false);
          }}
        >
          帳號或密碼錯誤
        </Alert>
      )}
    </div>
  );
};

const CreateBlock = () => {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const passwordConfirmation = useRef("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);
  const [alert, setAlert] = useState({
    value: false,
    message: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    name.current = event.target.value;
  };

  const handleEmailChange = (event) => {
    email.current = event.target.value;
  };

  const handlePasswordChange = (event) => {
    password.current = event.target.value;
  };

  const handlePasswordConfirmationChange = (event) => {
    passwordConfirmation.current = event.target.value;
  };

  const registerAccount = () => {
    if (name.current == "") {
      setNameError(true);
      return false;
    }

    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(email.current)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      return false;
    }

    if (password.current == "") {
      setPasswordError(true);
      return false;
    }

    if (passwordConfirmation.current == "") {
      setPasswordConfirmationError(true);
      return false;
    }

    if (passwordConfirmation.current != password.current) {
      setAlert({
        value: "true",
        message: "密碼輸入不一致",
      });
      return false;
    }

    api
      .post("register", {
        name: name.current,
        email: email.current,
        password: password.current,
        password_confirmation: passwordConfirmation.current,
      })
      .then(({ data }) => {
        const { user } = data;
        console.log("user", user);
        dispatch({
          type: "SET_AUTH",
          payload: user,
        });

        const token = user.api_token;

        localStorage.setItem("token", `Bearer ${token}`);

        history.push("daily");
      })
      .catch((error) => {
        console.log("error", { error });

        const message = get(error, "response.data.message");
        if (message) {
          setAlert({
            value: true,
            message: message,
          });
        }
      });
  };

  return (
    <div className="flex flex-col">
      <TextField
        variant="standard"
        label="Name"
        type="text"
        error={nameError}
        onChange={handleNameChange}
      />

      <TextField
        variant="standard"
        label="Email address"
        type="email"
        error={emailError}
        onChange={handleEmailChange}
      />

      <TextField
        variant="standard"
        label="Password"
        type="password"
        error={passwordError}
        onChange={handlePasswordChange}
      />

      <TextField
        variant="standard"
        label="PasswordConfirmation"
        type="password"
        error={passwordConfirmationError}
        onChange={handlePasswordConfirmationChange}
      />

      <button
        className="p-3 bg-black text-white  rounded  shadow-sm mt-3 hover:opacity-80"
        onClick={registerAccount}
      >
        Create
      </button>

      {alert.value == true && (
        <Alert
          className="absolute top-3 mx-autol"
          severity="error"
          onClose={() => {
            setAlert({
              value: false,
              message: "",
            });
          }}
        >
          {alert.message}
        </Alert>
      )}
    </div>
  );
};

export default LoginScreen;
