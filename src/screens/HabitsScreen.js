import Sidebar from "../components/Sidebar";
import HabitCard from "../components/HabitCard";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import SignInContainer from "../containers/SignInContainer";

const HabitsScreen = () => {
  const habitIDs = useSelector((state) => state.habit.id);

  return (
    <SignInContainer>
      <div className="flex flex-1 flex-col overflow-scroll ">
        <div className="flex flex-row justify-between ">
          <div>
            <div>Habits</div> <div>active habits</div>
          </div>
          <div>
            <button
              className=" text-white bg-green-400 p-1 rounded m-1"
              onClick={() => {
                console.log("建立");
              }}
            >
              New Habit
            </button>
          </div>
        </div>
        <div className=" flex-1 flex flex-wrap">
          {habitIDs.map((id) => {
            console.log("element", id);
            return <HabitCard key={id} id={id} />;
          })}
        </div>
      </div>
    </SignInContainer>
  );
};

export default HabitsScreen;
