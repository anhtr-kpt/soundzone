import { Link } from "react-router-dom";

const GenreCard = ({ title, description, color }) => {
  return (
    <li className="relative w-full rounded-lg border border-neutral-200 bg-transparent pl-4 pr-6 py-4 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300">
      <Link to="/admin/genres/pop" className="space-y-1">
        <h3 className="text-base font-bold">{title}</h3>
        <p>{description}</p>
      </Link>
      <div
        className="absolute top-2 right-2 size-3 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
    </li>
  );
};

export default GenreCard;
