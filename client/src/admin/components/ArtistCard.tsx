import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

const ArtistCard = ({ artistData }) => {
  return (
    <li className="">
      <Link to={`/admin/artists/${artistData.id}`} className="space-y-2">
        <div className="overflow-hidden group rounded-full border border-primary">
          <img
            src={artistData.avatarUrl}
            className="rounded-full group-hover:scale-110 duration-700 transition-transform"
          />
        </div>
        <div className="flex gap-1 items-center justify-center">
          <p className="font-medium">{artistData.name}</p>
          {artistData.isVerified && (
            <BadgeCheck strokeWidth={2} className="text-success" size={16} />
          )}
        </div>
      </Link>
    </li>
  );
};

export default ArtistCard;
