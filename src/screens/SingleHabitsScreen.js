import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { get } from "lodash";
import { useState } from "react";
import moment from "moment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import api from "../config/api";
import SignInContainer from "../containers/SignInContainer";

const SingleHabitsScreen = () => {
  const { id } = useParams();
  const habit = useSelector((state) => get(state, `db.habits.${id}`, {}));
  const title = get(habit, "title", "");

  const [value, onChange] = useState(new Date());

  return (
    <SignInContainer>
      <div className="flex flex-1 flex-col overflow-scroll ">
        <h1>{title}</h1>
        <Calendar id={id} />
      </div>
    </SignInContainer>
  );
};

const Calendar = ({ id }) => {
  const [monthOfChange, setMonthOfChange] = useState(0);
  const recordDates = useSelector((state) =>
    get(state, `habit.habit_done_records.${id}`, [])
  );

  const dispatch = useDispatch();

  const endOfMonth = moment()
    .add(monthOfChange, "months")
    .endOf("month")
    .format("D");
  const startIsoDayInMonth = moment()
    .add(monthOfChange, "months")
    .startOf("month")
    .format("dddd");
  const endIsoDayInMonth = moment()
    .add(monthOfChange, "months")
    .endOf("month")
    .format("dddd");
  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  const beforeThisMonthDay = () => {
    switch (startIsoDayInMonth) {
      case "Monday":
        return 0;
        break;
      case "Tuesday":
        return 1;
        break;
      case "Wednesday":
        return 2;
        break;
      case "Thursday":
        return 3;
        break;
      case "Friday":
        return 4;
        break;
      case "Saturday":
        return 5;
        break;
      case "Sunday":
        return 6;
        break;
    }
  };

  const afterThisMonthDay = () => {
    switch (endIsoDayInMonth) {
      case "Monday":
        return 6;
        break;
      case "Tuesday":
        return 5;
        break;
      case "Wednesday":
        return 4;
        break;
      case "Thursday":
        return 3;
        break;
      case "Friday":
        return 2;
        break;
      case "Saturday":
        return 1;
        break;
      case "Sunday":
        return 0;
        break;
    }
  };

  const totalDays =
    parseInt(endOfMonth) +
    parseInt(beforeThisMonthDay()) +
    parseInt(afterThisMonthDay());
  const weeks = new Array(Math.ceil(totalDays / 7)).fill(0);

  return (
    <div>
      <div className="flex  justify-between">
        <div>{moment().add(monthOfChange, "months").format("YYYY-MM")}</div>

        <div>
          {startIsoDayInMonth} {beforeThisMonthDay()}
        </div>

        <div>
          <button
            onClick={() => {
              setMonthOfChange(monthOfChange - 1);
            }}
          >
            <ChevronLeftIcon></ChevronLeftIcon>
          </button>
          <button
            onClick={() => {
              setMonthOfChange(monthOfChange + 1);
            }}
          >
            <ChevronRightIcon></ChevronRightIcon>
          </button>
        </div>
      </div>
      <table className="table-fixed">
        <thead>
          <tr>
            {days.map((item) => {
              return <td>{item}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {weeks.map((item, key) => {
            let changeDay = 0;
            switch (startIsoDayInMonth) {
              case "Monday":
                changeDay = 0;
                break;
              case "Tuesday":
                changeDay = -1;
                break;
              case "Wednesday":
                changeDay = -2;
                break;
              case "Thursday":
                changeDay = -3;
                break;
              case "Friday":
                changeDay = -4;
                break;
              case "Saturday":
                changeDay = -5;
                break;
              case "Sunday":
                changeDay = -6;
                break;
            }

            console.log("changeDay", changeDay);

            const weekDays = [
              moment()
                .add(monthOfChange, "months")
                .startOf("month")
                .add(changeDay + key * 7, "days"),
              moment()
                .startOf("month")
                .add(changeDay + 1 + key * 7, "days"),

              moment()
                .add(monthOfChange, "months")
                .startOf("month")
                .add(changeDay + 2 + key * 7, "days"),
              moment()
                .add(monthOfChange, "months")
                .startOf("month")
                .add(changeDay + 3 + key * 7, "days"),
              moment()
                .add(monthOfChange, "months")
                .startOf("month")
                .add(changeDay + 4 + key * 7, "days"),
              moment()
                .add(monthOfChange, "months")
                .startOf("month")
                .add(changeDay + 5 + key * 7, "days"),
              moment()
                .add(monthOfChange, "months")
                .startOf("month")
                .add(changeDay + 6 + key * 7, "days"),
            ];

            return (
              <tr>
                {weekDays.map((item) => {
                  const thatDates = item.format("YYYY-MM-DD");
                  const done = recordDates.includes(thatDates);

                  return (
                    <td className={`${done == true ? "bg-green-100 " : ""}`}>
                      <button
                        onClick={() => {
                          if (!done) {
                            dispatch({
                              type: "ADD_HABIT_RECORD",
                              payload: {
                                id: id,
                                date: thatDates,
                              },
                            });
                          } else {
                            dispatch({
                              type: "DELETE_HABIT_RECORD",
                              payload: {
                                id: id,
                                date: thatDates,
                              },
                            });
                          }

                          api
                            .put(`/habits/${id}/records`, {
                              finish_date: thatDates,
                              done: !done,
                            })
                            .then(({ data }) => {})
                            .catch((error) => {
                              console.log("error", error);
                            });
                        }}
                      >
                        {item.format("D")}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SingleHabitsScreen;
