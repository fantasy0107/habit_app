import { useDispatch, useSelector } from "react-redux";
import { DB_UPDATE_RECORD } from "../redux/actionTypes";
import pic from "../images/p81Eh87.jpg";
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Fab,
  Input,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { get } from "lodash";
import { useState } from "react";
import { steps } from "../config/gameRules";
import { API_URL } from "../config/config";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const TopicItemScreen = (props) => {
  const { id } = useParams();
  const { content } = useSelector((state) =>
    get(state, ["db", "topic", id], {})
  );

  console.log("TopicItemScreen", content);

  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
  };
  const [selectedTab, setSelectedTab] = useState("preview");

  return (
    <div>
      TopicItemScreen#{id}
      <Divider variant="fullWidth" />
      <div className="container">
        <ReactMde
          value={content}
          selectedTab={selectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<ReactMarkdown source={markdown} />)
          }
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
        />
      </div>
    </div>
  );
};

export default TopicItemScreen;
