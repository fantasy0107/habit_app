import { Button, Divider } from "@material-ui/core";
import axios from "axios";
import { get } from "lodash";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API_URL } from "../config/config";

const TopicItemScreen = (props) => {
  const { id } = useParams();
  const { content, title } = useSelector((state) =>
    get(state, ["db", "topic", id], {})
  );

  const [value, setValue] = useState(content);

  const [selectedTab, setSelectedTab] = useState("preview");
  const token = useSelector((state) =>
    get(state, ["auth", "user_token", "value"], "")
  );

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      TopicItemScreen#{id}
      <Divider variant="fullWidth" />
      <div className="container">
        <ReactMde
          value={value}
          selectedTab={selectedTab}
          onTabChange={(tab) => {
            setSelectedTab(tab);
          }}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<ReactMarkdown source={markdown} />)
          }
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
          onChange={onChange}
        />
      </div>
      {selectedTab === "write" && (
        <Button
          onClick={() => {
            axios.patch(
              API_URL + `topics/${id}`,
              {
                title,
                content: value,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }}
        >
          更新
        </Button>
      )}
    </div>
  );
};

export default TopicItemScreen;
