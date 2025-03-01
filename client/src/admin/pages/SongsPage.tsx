import { Link } from "react-router-dom";
import SongsList from "../components/SongsList";

const SongsPage = () => {
  return (
    <div>
      <Link to="/admin/songs/create-song">Create song</Link>
      <SongsList />
    </div>
  );
};

export default SongsPage;
