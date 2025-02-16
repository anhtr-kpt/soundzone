import { Search } from "lucide-react";

const Searchbar = () => {
  return (
    <form className="relative grow">
      <input
        type="text"
        className="w-full max-w-md py-2 pl-11 pr-4 rounded-xl border border-neutral-200 bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 text-sm"
        placeholder="Search by songs, artists or albums"
      />
      <Search
        strokeWidth={1.5}
        size={22}
        className="absolute top-1/2 left-3 -translate-y-1/2"
      />
    </form>
  );
};

export default Searchbar;
