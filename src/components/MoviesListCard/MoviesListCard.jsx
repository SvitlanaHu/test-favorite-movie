import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import styles from "./MoviesListCard.module.css";
import Button from "../Button/Button";

export const MoviesListCard = ({ movie }) => {
  const location = useLocation();
  const defaultImg =
        "https://doingwell.mit.edu/wp-content/uploads/2023/10/Movie-Night.jpeg";
      
  // Створюємо стан для зберігання списку улюблених фільмів
  const [favorites, setFavorites] = useState([]);

  // Функція для додавання фільму до списку улюблених
  const addToFavorites = (movieId) => {
    if (!favorites.includes(movieId)) {
      setFavorites([...favorites, movieId]);
    }
  };

  // Функція для видалення фільму зі списку улюблених
  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter((id) => id !== movieId));
  };

  return (
    <li key={movie.id}>
            <img src={movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                      : defaultImg
                     }
            alt={movie.title}
            className={styles.img} />
          
          <div>
            <Link to={`/movies/${movie.id}`} state={location} className={styles.link}>
              {movie.title}
            </Link>
            {favorites.includes(movie.id) ? (
              <Button onClick={() => removeFromFavorites(movie.id)}>
                <MdFavorite className={`${styles.icon} ${styles.favorite}`} />
              </Button>
            ) : (
              <Button onClick={() => addToFavorites(movie.id)}>
                <MdFavorite className={`${styles.icon} ${styles.notFavorite}`} />
              </Button>
            )}
              <div className={styles.rating}>
                <p>Рейтинг: {movie.rating}</p>
                <p>Дата виходу: {movie.release_date}</p>
              </div>
            </div>
               
        </li>
  );
};