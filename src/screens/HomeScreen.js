import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Fab,
  Modal,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { get } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../config/api";
import { DB_FILL } from "../redux/actionTypes";

const HabitItem = ({ id, handleOpen, setModalHabitID }) => {
  const name = useSelector((state) => get(state, `db.habit.${id}.name`, ""));
  const dispatch = useDispatch();
  return (
    <TableRow key={id}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => {
            handleOpen();
            setModalHabitID(id);
          }}
        >
          UPDATE
        </Button>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => {
            dispatch({
              type: "HABIT_DELETE",
              payload: id,
            });

            api.delete(`habits/${id}`);
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

const HabitModal = ({ id, isVisible, handleClose }) => {
  const name = useSelector((state) => get(state, `db.habit.${id}.name`, ""));
  const content = useSelector((state) =>
    get(state, `db.habit.${id}.content`, "")
  );
  const dispatch = useDispatch();
  const nameRef = useRef(name);
  const contentRef = useRef(content);

  useEffect(() => {
    nameRef.current = name;
  }, [name]);
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  console.log("HabitModal", {
    id,
    name,
    content,
    nameRef: nameRef.current,
    contentRef: contentRef.current,
  });

  const handleNameChange = (event) => {
    nameRef.current = event.target.value;
  };

  const handleContentChange = (event) => {
    contentRef.current = event.target.value;
  };
  const updateHabit = () => {
    api
      .patch(`habits/${id}`, {
        name: nameRef.current,
        content: contentRef.current,
      })
      .then(({ data }) => {
        if (data.db) {
          if (data.db) {
            dispatch({
              type: DB_FILL,
              payload: data.db,
            });
          }
        }
      });

    handleClose();
  };

  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 400,
          backgroundColor: "white",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-password">標題</InputLabel>
          <Input defaultValue={nameRef.current} onChange={handleNameChange} />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-password">內容</InputLabel>
          <Input
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax={10}
            defaultValue={contentRef.current}
            onChange={handleContentChange}
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" color="primary" onClick={updateHabit}>
            save
          </Button>
        </FormControl>
      </div>
    </Modal>
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  console.log("history", history);
  const habitIDs = useSelector((state) => get(state, "habits.id", []));
  const [isVisible, setIsVisible] = useState(false);
  const menus = [
    {
      title: "TRACK",
      items: [
        {
          title: "Habit",
          icon: "",
        },
      ],
    },
  ];

  const [modalHabitID, setModalHabitID] = useState(0);

  const habitTitle = useRef("");

  useEffect(() => {
    api.get("me/habits").then(({ data }) => {
      const { habit_ids, db } = data;

      dispatch({
        type: "HABIT_INIT",
        payload: habit_ids,
      });

      if (db) {
        dispatch({
          type: DB_FILL,
          payload: db,
        });
      }
    });
  }, [dispatch]);

  const addHabit = () => {
    api
      .post("habits", {
        name: habitTitle.current,
      })
      .then(({ data }) => {
        dispatch({
          type: "HABIT_ADD",
          payload: [data.data.id],
        });

        if (data.db) {
          if (data.db) {
            dispatch({
              type: DB_FILL,
              payload: data.db,
            });
          }
        }
      });
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  return (
    <div className="flex">
      <div className="w-full relative">
        <div className="flex shadow mb-4">
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            placeholder="新增習慣"
            onChange={(event) => {
              habitTitle.current = event.target.value;
            }}
          />
          <Button variant="contained" color="primary" onClick={addHabit}>
            新增
          </Button>
        </div>
        <div className="shadow">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>標題</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {habitIDs.map((id) => {
                return (
                  <HabitItem
                    key={id}
                    id={id}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    setModalHabitID={setModalHabitID}
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <HabitModal
        isVisible={isVisible}
        handleClose={handleClose}
        id={modalHabitID}
      />
    </div>
  );
};

export default HomeScreen;
