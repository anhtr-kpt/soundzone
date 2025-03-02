import { Artist } from "@/types/artist.types";
import { Link } from "react-router-dom";

const ArtistCard = ({ slug, stageName, avatarUrl }: Artist) => {
  return (
    <li className="">
      <Link to={`/admin/artists/${slug}`} className="space-y-2">
        <div className="overflow-hidden group rounded-full border border-primary">
          <img
            src={avatarUrl}
            className="rounded-full group-hover:scale-110 duration-700 transition-transform"
          />
        </div>
        <div className="flex gap-1 items-center justify-center">
          <p className="font-medium">{stageName}</p>
        </div>
      </Link>
    </li>
  );
};

export default ArtistCard;
