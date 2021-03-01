import {
  Button,
  Container
} from "@material-ui/core";
import axios from "axios";
import { get } from "lodash";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useSelector } from "react-redux";
import { API_URL } from "../config/config";

const TopicCreateScreen = (props) => {
  const token = useSelector((state) =>
    get(state, ["auth", "user_token", "value"], "")
  );
  const [selectedTab, setSelectedTab] = useState("write");
  const [value, setValue] = useState("");

  const onChange = (value) => {
    setValue(value);
  };
  const create = () => {
    axios
      .post(
        API_URL + "topics",
        {
          content: value,
        },
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
      <div className="container">
        <ReactMde
          value={value}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<ReactMarkdown source={markdown} />)
          }
          onChange={onChange}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
        />
      </div>
      <Button variant="contained" color="primary" onClick={create}>
        送出
      </Button>
    </Container>
  );
};

export default TopicCreateScreen;
