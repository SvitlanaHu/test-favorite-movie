// FavoriteMovieListWithDB.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {AddEditMovieForm} from "../AddEditMovieForm/AddEditMovieForm";
import styles from "./FavoriteMovieListWithDB.module.css";

export const FavoriteMovieListWithDB = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/db.json") 
      .then((response) => response.json())
      .then((data) => setMovies(data.movies));
  }, []);

  const addMovie = (movieData) => {
    setMovies([...movies, movieData]);
  };

  return (
    <>
      <h2>Add a New Movie</h2>
      <AddEditMovieForm onSubmit={addMovie} />

      <h2>My Favorite Movie List</h2>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id}>            
              <img src={movie.image} alt={movie.title} className={styles.img} />
              <div>
                <Link to={`/favorite/${movie.id}`} className=     {styles.link}>                
                  {movie.title}
                </Link>
                <div className={styles.rating}>
                  <p>Rating: {movie.rating}</p>
                  <p>Release Date: {movie.release_date}</p>
                </div>                
              </div>            
          </li>
        ))}
      </ul>
    </>
  );
};

