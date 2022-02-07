import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Brightness5Icon from "@mui/icons-material/Brightness5";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HomeIcon from "@mui/icons-material/Home";

const Sidebar = () => {
  const hoverColor = "hover:bg-gray-300";

  const tagIDS = useSelector((state) => state.tag.id);

  return (
    <div className="w-1/5 bg-gray-200 p-3">
      <ul>
        <li className={`${hoverColor}`}>
          <Link to="/home">
            <HomeIcon />
            Home
          </Link>
        </li>
        <li className={`${hoverColor}`}>
          <Link to="/daily">
            <Brightness5Icon />
            Daily
          </Link>
        </li>
        <li className={`${hoverColor}`}>
          <Link to="/monthly">
            <DateRangeIcon />
            Monthly
          </Link>
        </li>
        <li className={`${hoverColor}`}>
          <Link to="/habits">
            <DashboardIcon />
            Habits
          </Link>
        </li>
        <li className={`${hoverColor}`}>
          <Link to="/labels">
            <LocalOfferIcon />
            labels
          </Link>
        </li>
      </ul>

      
    </div>
  );
};

export default Sidebar;
