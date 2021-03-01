import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import axios from "axios";
import { get } from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../config/config";

const TargetCreateScreen = (props) => {
  const token = useSelector((state) =>
    get(state, ["auth", "user_token", "value"], "")
  );

  const [name, setName] = useState("");

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
      .then(({ data }) => {})
      .catch((error) => {});
  };

  return (
    <Container>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button onClick={submit}>送出</Button>
      </FormControl>
    </Container>
  );
};

export default TargetCreateScreen;
