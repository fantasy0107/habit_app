import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import api from "../config/api";
import { useEffect, useState } from "react";
import { get } from "lodash";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SignInContainer from "../containers/SignInContainer";

const MonthlyScreen = () => {
  const date = new Date();
  const [monthOfChange, setMonthOfChange] = useState(0);
  const habitIDs = useSelector((state) => state.habit.id);

  // const startOfMonth = moment().add(monthOfChange, 'months').startOf('month').format('YYYY-MM-DD');
  const endOfMonth = moment()
    .add(monthOfChange, "months")
    .endOf("month")
    .format("D");

  return (
    <SignInContainer>
      <div className="flex-1 overflow-scroll">
        <header className="flex flex-row">
          <div className="flex-1">
            {moment().add(monthOfChange, "months").format("YYYY-MM")}
          </div>
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
        </header>
        <div>
          {habitIDs.map((id) => {
            return <MonthItem key={id} id={id} monthOfChange={monthOfChange} />;
          })}
        </div>
      </div>
    </SignInContainer>
  );
};

const MonthItem = ({ id, monthOfChange = 0 }) => {
  const habit = useSelector((state) => get(state, `db.habits.${id}`, {}));
  const habitTitle = get(habit, "title", "default");
  const endDate = get(habit, "end_date", null);

  const endOfMonth = moment()
    .add(monthOfChange, "months")
    .endOf("month")
    .format("D");
  const itemDates = [];
  for (let index = 1; index <= endOfMonth; index++) {
    itemDates.push(index);
  }

  console.log("endOfMonth", endOfMonth);

  return (
    <div className="flex flex-row">
      <div className="w-14">{habitTitle}</div>
      {itemDates.map((item) => {
        return (
          <MonthItemPiece
            key={id + item}
            id={id}
            index={item}
            monthOfChange={monthOfChange}
          />
        );
      })}
    </div>
  );
};

const MonthItemPiece = ({ id, index, monthOfChange }) => {
  const habit = useSelector((state) => get(state, `db.habits.${id}`, {}));
  const endDate = get(habit, "end_date", null);
  const recordDates = useSelector((state) =>
    get(state, `habit.habit_done_records.${id}`, [])
  );

  const year = moment()
    .add(monthOfChange, "months")
    .endOf("month")
    .format("YYYY");

  const month = moment()
    .add(monthOfChange, "months")
    .endOf("month")
    .format("MM");

  const [isDoneThatToday, setIsDoneThatToday] = useState(
    recordDates.includes(
      moment(`${year}-${month}-${index}`, "YYYY-MM-DD").format("YYYY-MM-DD")
    )
  );
  const status = isDoneThatToday ? "bg-green-300" : "bg-gray-300";

  const dispatch = useDispatch();

  useEffect(() => {
    setIsDoneThatToday((state) =>
      recordDates.includes(
        moment(`${year}-${month}-${index}`, "YYYY-MM-DD").format("YYYY-MM-DD")
      )
    );
  }, [monthOfChange]);

  return (
    <button
      key={id + index}
      className={`flex flex-1 h-7  ${status} hover:bg-gray-500`}
      onClick={() => {
        setIsDoneThatToday(!isDoneThatToday);

        if (!isDoneThatToday) {
          dispatch({
            type: "ADD_HABIT_RECORD",
            payload: {
              id: id,
              date: moment(`${year}-${month}-${index}`, "YYYY-MM-DD").format(
                "YYYY-MM-DD"
              ),
            },
          });
        } else {
          dispatch({
            type: "DELETE_HABIT_RECORD",
            payload: {
              id: id,
              date: moment(`${year}-${month}-${index}`, "YYYY-MM-DD").format(
                "YYYY-MM-DD"
              ),
            },
          });
        }

        api
          .put(`/habits/${id}/records`, {
            finish_date: moment(
              `${year}-${month}-${index}`,
              "YYYY-MM-DD"
            ).format("YYYY-MM-DD"),
            done: !isDoneThatToday,
          })
          .then(({ data }) => {})
          .catch((error) => {
            console.log("error", error);
          });
      }}
    >
      {index}
    </button>
  );
};

export default MonthlyScreen;
