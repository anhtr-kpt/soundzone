import GenreCard from "./GenreCard";
import { useGetGenresQuery } from "@/store/api/genreApi";

const GenresList = () => {
  const { data, isLoading } = useGetGenresQuery();

  if (isLoading) {
    return;
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      {data?.data?.genres.map((genre) => (
        <GenreCard key={genre._id} {...genre} />
      ))}
    </ul>
  );
};

export default GenresList;
