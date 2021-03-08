import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Input,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { get } from "lodash";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { API_URL } from "../config/config";
import { steps } from "../config/gameRules";
import { DB_FILL, DB_UPDATE_RECORD } from "../redux/actionTypes";
import api from "../config/api";

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
  const addTagName = useRef("");
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

  const handleOpen = ({ title, content }) => {
    setOpen(true);
    setTitle(title);
    setContent(content);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const token = useSelector((state) =>
    get(state, ["auth", "user_token", "value"], "")
  );

  useEffect(() => {
    axios
      .get(API_URL + "topics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          target_id: target_item,
        },
      })
      .then(({ data }) => {
        const { db, topic_id, tag_id } = data;

        if (tag_id) {
          dispatch({
            type: "TOPIC_FILL",
            payload: topic_id,
          });

          dispatch({
            type: "TAG_FILL",
            payload: tag_id,
          });

          if (db) {
            dispatch({
              type: DB_FILL,
              payload: db,
            });
          }
        }
      })
      .catch((error) => {});
  }, [dispatch, target_item, token]);

  const topicIDs = useSelector((state) => get(state, "topic.id", []));
  const tagIDs = useSelector((state) => get(state, "topic.tagID", []));

  const addTag = () => {
    api
      .post("target_tags", {
        target_id: id,
        name: addTagName.current,
      })
      .then(({ data }) => {
        const { db, id } = data;

        dispatch({
          type: "TAG_ADD",
          payload: id,
        });

        if (db) {
          dispatch({
            type: DB_FILL,
            payload: db,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="flex flex-col flex-1  my-3">
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

        <TagNames />

        <Input
          onChange={(e) => {
            addTagName.current = e.target.value;
          }}
        />
        <Button onClick={addTag}>新增</Button>
      </div>
      <Divider className="w-full"></Divider>
      <div className="p-3">
        <Typography className="text-blue-500">可用標籤話題</Typography>
        {tagIDs.map((item) => {
          return (
            <Tag
              id={item}
              tagID={item}
              topics={topicIDs}
              handleOpen={handleOpen}
            />
          );
        })}
      </div>

      <div className="px-3">
        <Typography className="text-blue-500">可用話題</Typography>
        <List>
          {topicIDs.map((id) => {
            return <TopicCard key={id} id={id} handleOpen={handleOpen} />;
          })}
        </List>
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
    </div>
  );
};

const TopicCard = ({ id, handleOpen }) => {
  const { content, title } = useSelector((state) =>
    get(state, ["db", "topic", id], {})
  );
  return (
    <ListItem onClick={() => handleOpen({ title, content })} className="w-32">
      {title}
    </ListItem>
  );
};

/**
 *  標籤
 *  1. 可用話題
 *  ...
 */
const Tag = ({ id, topics, handleOpen, tagID }) => {
  const { name = "" } = useSelector((state) =>
    get(state, ["db", "target_tag", id], {})
  );

  return (
    <div className="flex my-2">
      <Typography variant="h5">{name}</Typography>
      {topics.map((item) => {
        return <Topic id={item} handleOpen={handleOpen} tagID={tagID} />;
      })}
    </div>
  );
};

const TagNames = () => {
  const tagIDs = useSelector((state) => get(state, ["topic", "tagID"], []));

  return (
    <div className="flex flex-row">
      {tagIDs.map((item) => {
        return <TagItem id={item} />;
      })}
    </div>
  );
};

const TagItem = ({ id }) => {
  const { name } = useSelector((state) =>
    get(state, ["db", "target_tag", id], [])
  );

  return (
    <div className="mx-1">
      <Typography className="rounded bg-red-400 text-white p-2">
        {name}
      </Typography>
    </div>
  );
};

const Topic = ({ id, handleOpen, tagID }) => {
  const { title, content, tag_id } = useSelector((state) =>
    get(state, ["db", "topic", id], {})
  );

  if (tag_id.includes(tagID) == false) {
    return <div />;
  }

  return (
    <div>
      <Card className="mx-1">
        <Button onClick={() => handleOpen({ title, content })}>
          <CardContent>
            <CardActions>
              <Typography>{title}</Typography>
            </CardActions>
          </CardContent>
        </Button>
      </Card>
    </div>
  );
};

export default TargetItemScreen;
