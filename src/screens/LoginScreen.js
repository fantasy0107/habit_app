import {
  Button,
  Container,
  FormControl,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const LoginScreen = (props) => {
  const email = useRef("");
  const password = useRef("");
  const [open, setOpen] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost/api/"
      : "https://dodog.org/api/";

  const clickLogIn = () => {
    console.log("clickLogIn", {
      email,
      password,
    });

    axios
      .post(API_URL + "login", {
        email: email.current,
        password: password.current,
      })
      .then(({ data }) => {
        const { user } = data;

        dispatch({
          type: "SET_AUTH",
          payload: user,
        });

        console.log("ok");
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
            onChange={(event) => {
              console.log("email", event);

              email.current = event.target.value;
            }}
          />
          <TextField
            id="standard-required"
            label="Password"
            onChange={(event) => {
              console.log("Password", event);

              password.current = event.target.value;
            }}
          />
        </FormControl>
        <div className="flex justify-end mt-2">
          <Button variant="contained" color="primary" onClick={clickLogIn}>
            Log IN
          </Button>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <div>This is a success message!</div>
        </Snackbar>
      </div>
    </Container>
  );
};

export default LoginScreen;
