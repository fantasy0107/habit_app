import { Button, Container, Divider, FormControl, FormGroup, Snackbar, TextField, Typography } from "@material-ui/core";
import { useRef, useState } from "react";
import FacebookLogin from "react-facebook-login";
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
    <div className='h-screen bg-gray-100'>
      <div className='container  mx-auto '>
        <div className="flex flex-col items-center ">
          <div className="flex flex-col justify-center items-center  border-solid border mt-3 p-4 w-1/3 bg-white">
            <Typography variant="h3">Habit</Typography>
            <FormControl noValidate autoComplete="off">
              <TextField
                id="standard-required"
                label="Email"
                onChange={changeEmail}
              />
              <TextField
                id="standard-required"
                label="Password"
                onChange={changePassword}
                type="password"
              />
              <div className="my-2" />
              <Button variant="contained" color="primary" onClick={clickLogIn}>
                登入
              </Button>

              <div className="my-3">
                <Divider />
              </div>

              <FacebookLogin
                icon="fa-facebook"
                appId="727049798184350"
                fields="name,email,picture"
                autoLoad={false}
                onClick={componentClicked}
                callback={responseFacebook}
                textButton="Login via Facebook"
              />

              <div className="my-1" />

              <GoogleLogin
                clientId="794749865058-47dog279hhjn6c9pcq515lqvcqj71h34.apps.googleusercontent.com"
                buttonText="Login via Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </FormControl>
          </div>
          <div className="flex flex-col justify-center items-center  border-solid border mt-3 p-4 w-1/3 bg-white">
            <Button variant="contained" color="primary"  >
              註冊
            </Button>
          </div>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <div>找不到使用者</div>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
