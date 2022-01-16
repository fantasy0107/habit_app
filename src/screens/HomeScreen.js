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

const HomeScreen = () => {
  return <div className="flex">home</div>;
};

export default HomeScreen;
