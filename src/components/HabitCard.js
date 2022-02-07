import { useSelector } from "react-redux";
import get from "lodash/get";
import { Link } from "react-router-dom";

const HabitCard = ({ id = 0 }) => {
  const habit = useSelector((state) => get(state, `db.habits.${id}`, {}));
  const title = get(habit, "title", "default");
  const start_date = get(habit, "start_date", "default_date");

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <a href="#">
          <img
            alt="Placeholder"
            className="block h-auto w-full"
            src="https://picsum.photos/600/400/?random"
          />
        </a>

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <Link
              className="no-underline hover:underline text-black"
              to={`habits/${id}`}
            >
              {title}
            </Link>
          </h1>
          <p className="text-grey-darker text-sm">{start_date}</p>
        </header>
      </article>
    </div>
  );
};

export default HabitCard;
