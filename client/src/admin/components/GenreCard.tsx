import { Genre } from "@/types/genre.types";
import { Link } from "react-router-dom";

const GenreCard = ({ name, description, _id }: Genre) => {
  return (
    <li className="w-full rounded-lg border border-neutral-200 bg-transparent px-4 py-3 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300">
      <Link to={`/admin/genres/${_id}`} className="space-y-1">
        <h3 className="text-base font-bold">{name}</h3>
        <p>{description}</p>
      </Link>
    </li>
  );
};

export default GenreCard;
