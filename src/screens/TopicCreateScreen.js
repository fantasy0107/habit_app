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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { API_URL } from "../config/config";
import { get } from "lodash";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const TopicCreateScreen = (props) => {
  const handleChange = (value) => {
    content.current = value;
    // setMdeValue(value);
  };

  const content = useRef("");

  const dispatch = useDispatch();

  const token = useSelector((state) =>
    get(state, ["auth", "user_token", "value"], "")
  );
  const [selectedTab, setSelectedTab] = useState("write");
  const [value, setValue] = useState("");
  return (
    <Container>
      <div className="container">
        <ReactMde
          value={value}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<ReactMarkdown source={markdown} />)
          }
          onChange={(value) => {
            setValue(value);
            console.log("object", value);
          }}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          axios
            .post(
              API_URL + "topics",
              {
                content: content.current,
              },
              {
                headers: {
                  Authorization: "Bearer " + token, //the token is a variable which holds the token
                },
              }
            )
            .then(({ data }) => {})
            .catch((error) => {});
        }}
      >
        送出
      </Button>
    </Container>
  );
};

export default TopicCreateScreen;
