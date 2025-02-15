import { Search } from "lucide-react";

const Searchbar = () => {
  return (
    <form className="relative grow">
      <input
        type="text"
        className="w-full max-w-md py-2 pl-11 pr-4 bg-placeholder rounded-xl"
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
