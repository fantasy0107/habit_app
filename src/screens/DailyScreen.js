import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import api from "../config/api";
import moment from "moment";
import { Link } from "react-router-dom";
import SignInContainer from "../containers/SignInContainer";

const DailyScreen = () => {
  const habitIDs = useSelector((state) => state.habit.id);
  let date = new Date();
  const [dayOfChange, setDayOfChange] = useState(0);

  date.setDate(date.getDate() + dayOfChange);

  return (
    <SignInContainer>
      <header className="flex flex-row">
        <div className=" flex-1"> {date.toDateString()}</div>
        <button
          onClick={() => {
            setDayOfChange(dayOfChange - 1);
          }}
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </button>
        <button
          onClick={() => {
            setDayOfChange(dayOfChange + 1);
          }}
        >
          <ChevronRightIcon></ChevronRightIcon>
        </button>
      </header>
      <div className="">
        {habitIDs.map((habitid) => {
          return <Habit key={habitid} id={habitid} dayOfChange={dayOfChange} />;
        })}
      </div>
    </SignInContainer>
  );
};

const Habit = ({ id = 0, dayOfChange = 0 }) => {
  const habit = useSelector((state) => get(state, `db.habits.${id}`, {}));
  const habitTitle = get(habit, "title", "default");
  const recordDates = useSelector((state) =>
    get(state, `habit.habit_done_records.${id}`, [])
  );

  const dispatch = useDispatch();
  const [isDoneToday, setIsDoneToday] = useState(
    recordDates.includes(moment().add(dayOfChange).format("YYYY-MM-DD"))
  );

  useEffect(() => {
    setIsDoneToday((state) =>
      recordDates.includes(
        moment().add(dayOfChange, "days").format("YYYY-MM-DD")
      )
    );
  }, [dayOfChange]);

  return (
    <div className="flex flex-row p-1 hover:bg-gray-200">
      <button
        onClick={() => {
          const result = !isDoneToday;

          if (result) {
            dispatch({
              type: "ADD_HABIT_RECORD",
              payload: {
                id: id,
                date: moment().add(dayOfChange, "days").format("YYYY-MM-DD"),
              },
            });
          } else {
            dispatch({
              type: "DELETE_HABIT_RECORD",
              payload: {
                id: id,
                date: moment().add(dayOfChange, "days").format("YYYY-MM-DD"),
              },
            });
          }

          setIsDoneToday(result);

          api
            .put(`/habits/${id}/records`, {
              finish_date: moment()
                .add(dayOfChange, "days")
                .format("YYYY-MM-DD"),
              done: result,
            })
            .then(({ data }) => {})
            .catch((error) => {
              console.log("error", error);
            });
        }}
      >
        {isDoneToday == true ? (
          <CheckBoxIcon></CheckBoxIcon>
        ) : (
          <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
        )}
      </button>
      <div className="ml-3">
        <Link to={`habits/${id}`}>{habitTitle}</Link>
      </div>
    </div>
  );
};

export default DailyScreen;
