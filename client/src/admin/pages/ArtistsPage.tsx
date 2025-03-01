import ArtistsList from "../components/ArtistsList";
import { Link } from "react-router-dom";

const ArtistsPage = () => {
  return (
    <div>
      <Link to="/admin/artists/create-artist">Create artist</Link>
      <ArtistsList />
    </div>
  );
};

export default ArtistsPage;
