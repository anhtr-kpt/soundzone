import { ISongData } from "@/types";
import { Link } from "react-router-dom";

const SongCard = ({ songData }: { songData: ISongData }) => {
  return (
    <li className="">
      <Link to={`/admin/songs/${songData._id}`}>
        <div className="overflow-hidden group rounded-lg">
          <img
            src={songData.thumbnail}
            className="w-full aspect-square group-hover:scale-110 transition-transform duration-700 linear"
          />
        </div>
      </Link>
      <div className="text-center mt-3">
        <p className="font-bold text-[15px] capitalize">{songData.title}</p>
        <p className="text-ellipsis">
          {songData.artists.map((artist, index) => (
            <span key={artist}>
              <Link className="primary-hover" to={`/admin/artists/${artist}`}>
                {artist}
              </Link>
              {index < songData.artists.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
};

export default SongCard;
