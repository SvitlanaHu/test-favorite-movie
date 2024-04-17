import { useState } from "react";
import { FavoriteMovieListWithDB } from "../components/FavoriteMovieListWithDB/FavoriteMovieListWithDB";

const MyFavoriteMoviesPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <main>
      <h1>My Favorite Movie List</h1>
      <button onClick={handleToggleForm}>Add New Movie</button>
      {showForm && <FavoriteMovieListWithDB />}
    </main>
  );
};

export default MyFavoriteMoviesPage;