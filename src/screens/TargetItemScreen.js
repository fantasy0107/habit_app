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

const TargetItemScreen = (props) => {
  const { target_item } = useParams();
  const dispatch = useDispatch();
  const { name, step = 0, id } = useSelector((state) =>
    get(state, ["db", "target", target_item], {})
  );
  const [state, setState] = useState(step);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    const { value } = event.target;

    setState(value);
  };
  const history = useHistory();
  const submit = () => {
    dispatch({
      type: DB_UPDATE_RECORD,
      payload: {
        key: "target",
        id: id,
        value: {
          step: state,
        },
      },
    });
  };

  const interest = [
    {
      title: "美食",
      value: 0,
    },
    {
      title: "旅行",
      value: 1,
    },
    {
      title: "其它",
      value: 99,
    },
  ];

  const topics = [
    {
      title: "吃飯",
      content: "吃飯吃飯吃飯吃飯吃飯",
      tag_id: 0,
    },
    {
      title: "吃飯",
      content: "吃飯吃飯吃飯吃飯吃飯",
      tag_id: 0,
    },
    {
      title: "吃飯",
      content: "吃飯吃飯吃飯吃飯吃飯",
      tag_id: 0,
    },
    {
      title: "吃飯",
      content: "吃飯吃飯吃飯吃飯吃飯",
      tag_id: 0,
    },
    {
      title: "出去玩",
      content: "出去玩",
      tag_id: 1,
    },
    {
      title: "出去玩",
      content: "出去玩",
      tag_id: 1,
    },
    {
      title: "出去玩",
      content: "出去玩",
      tag_id: 1,
    },
    {
      title: "出去玩",
      content: "出去玩",
      tag_id: 1,
    },
    {
      title: "出去玩",
      content: "出去玩",
      tag_id: 1,
    },
    {
      title: "出去玩",
      content: "出去玩",
      tag_id: 1,
    },
    {
      title: "出去玩",
      content: "出去玩",
      tag_id: 99,
    },
  ];

  const handleOpen = ({ title, content }) => {
    setOpen(true);
    setTitle(title);
    setContent(content);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col flex-1  my-3">
      {/* <img alt={name} src={pic} className=" max-w-sm" /> */}
      <div className="flex flex-col items-center">
        <div className="flex">
          <Typography variant="h3">{name}</Typography>
          <Typography variant="h5">#{target_item}</Typography>
        </div>

        <div className="flex mb-3">
          <Select value={state} onChange={handleChange} defaultValue={state}>
            {Object.keys(steps).map((item, index) => {
              const { content, point } = steps[item];
              return (
                <MenuItem
                  key={point}
                  value={index}
                >{`# ${point} ${content}`}</MenuItem>
              );
            })}
          </Select>
          <div className="mx-3" />
          <Button color="primary" variant="contained" onClick={submit}>
            送出
          </Button>
        </div>
      </div>
      <Divider className="w-full"></Divider>
      <div className="p-3">
        <Typography variant="h5">興趣</Typography>
        <div className="flex">
          {interest.map((item) => {
            return (
              <div className="mr-1">
                <Typography className="rounded bg-red-400 text-white p-2">
                  {item.title}
                </Typography>
              </div>
            );
          })}
        </div>
        <Input />
        <Button>新增</Button>
      </div>
      <Divider className="w-full"></Divider>
      <div className="p-3">
        <Typography className="text-blue-500">可用話題</Typography>
        {interest.map((item) => {
          const { title, value } = item;
          return (
            <div className="flex my-2">
              <Typography>{title}</Typography>
              {topics.map((item) => {
                const { tag_id, title, content } = item;
                if (tag_id !== value) {
                  return;
                }

                return (
                  <Card className="mx-1">
                    <Button onClick={() => handleOpen({ title, content })}>
                      <CardContent>
                        <CardActions>
                          <Typography>{title}</Typography>
                        </CardActions>
                      </CardContent>
                    </Button>
                  </Card>
                );
              })}
            </div>
          );
        })}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      </Dialog>

      <List>
        {topics.map((item) => {
          const { content } = item;
          return <ListItem className="w-32">{content}</ListItem>;
        })}
      </List>
    </div>
  );
};

export default TargetItemScreen;
