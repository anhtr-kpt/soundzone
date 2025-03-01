import { Link } from "react-router-dom";
import GenresList from "../components/GenresList";

const GenresPage = () => {
  return (
    <div>
      <Link to="/admin/genres/create-genre">Create genre</Link>
      <GenresList />
    </div>
  );
};

export default GenresPage;
