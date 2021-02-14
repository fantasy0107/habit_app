import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { get } from "lodash";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { API_URL } from "../config/config";

const TargetCreateScreen = (props) => {
  const token = useSelector((state) =>
    get(state, ["auth", "user_token", "value"], "")
  );

  const [name, setName] = useState("");
  console.log("token", token);

  const submit = () => {
    axios
      .post(
        API_URL + "targets",
        { name },
        {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        }
      )
      .then(({ data }) => {
        // if (data.db) {
        //   dispatch({
        //     type: DB_FILL,
        //     payload: data.db,
        //   });
        // }
        // dispatch({
        //   type: "TARGET_FILL",
        //   payload: data.targets,
        // });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Container>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(e) => {
            console.log("e", e.target.value);

            setName(e.target.value);
          }}
        />
        <Button onClick={submit}>送出</Button>
      </FormControl>
    </Container>
  );
};

export default TargetCreateScreen;
