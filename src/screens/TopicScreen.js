import { Button, Container } from "@material-ui/core";
import axios from "axios";
import { get } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { API_URL } from "../config/config";
import { DB_FILL } from "../redux/actionTypes";

const TopicScreen = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) =>
    get(state, ["auth", "user_token", "value"], "")
  );

  useEffect(() => {
    axios
      .get(API_URL + "topics", {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then(({ data }) => {
        if (data.db) {
          dispatch({
            type: DB_FILL,
            payload: data.db,
          });
        }

        dispatch({
          type: "TOPIC_FILL",
          payload: data.topic_id,
        });
      })
      .catch((error) => {});
  }, [dispatch, token]);

  const topicIDs = useSelector((state) => get(state, ["topic", "id"], []));

  const history = useHistory();
  return (
    <Container>
      TopicScreen
      {topicIDs.map((item) => {
        return (
          <Button
            onClick={() => {
              history.push("topic/" + item);
            }}
          >
            #{item}
          </Button>
        );
      })}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          history.push("topic_create");
        }}
      >
        +
      </Button>
    </Container>
  );
};

export default TopicScreen;
