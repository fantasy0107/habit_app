import {
  Button,
  Container,
  FormControl,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../config/api";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

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

  return (
    <Container>
      <div className=" w-full  h-9 bg-purple-700 p-2">
        <Typography className="text-white">Log in</Typography>
      </div>
      <div className="flex flex-col  justify-center">
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
        </FormControl>
        <div className="flex flex-col justify-end mt-2">
          <div>
            <Button variant="contained" color="primary" onClick={clickLogIn}>
              登入
            </Button>
          </div>
          <div>
            <FacebookLogin
              appId="727049798184350"
              fields="name,email,picture"
              autoLoad={false}
              // onClick={componentClicked}
              callback={responseFacebook}
            />
          </div>
          <div>
            <GoogleLogin
              clientId="794749865058-47dog279hhjn6c9pcq515lqvcqj71h34.apps.googleusercontent.com"
             
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <div>找不到使用者</div>
        </Snackbar>
      </div>
    </Container>
  );
};

export default LoginScreen;
