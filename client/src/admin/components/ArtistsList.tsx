import { useGetArtistsQuery } from "@/store/api/artistApi";
import ArtistCard from "./ArtistCard";

const ArtistsList = () => {
  const { data, isLoading } = useGetArtistsQuery();

  if (isLoading) {
    return;
  }

  return (
    <ul
      role="list"
      className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
    >
      {data?.data?.artists.map((artist) => (
        <ArtistCard key={artist._id} {...artist} />
      ))}
    </ul>
  );
};

export default ArtistsList;
