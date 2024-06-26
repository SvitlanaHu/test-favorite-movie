import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import styles from "./MoviesList.module.css";
import Button from "../Button/Button";

export const MoviesList = ({ movies }) => {
  const location = useLocation();
  const defaultImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjdn4c3Gb3xX-8vCDtC7SDbRDjTNjufAbrDg&usqp=CAU";
      
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
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
            <img src={movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                      : defaultImg
                     }
            alt={movie.title}
            className={styles.img} />
          
          <div className={styles.box}>            
            <div>
              <Link to={`/movies/${movie.id}`} state={location} className={styles.link}>
                 {movie.title}
              </Link>                      
              <div className={styles.rating}>
                <p>Рейтинг: {movie.rating}</p>
                <p>Дата виходу: {movie.release_date}</p>
              </div>
            </div>  
             {favorites.includes(movie.id) ? (
                 <Button className={styles.btn} onClick={() => removeFromFavorites(movie.id)}>
                   <MdFavorite className={`${styles.icon} ${styles.favorite}`} />
                 </Button>
               ) : (
                 <Button onClick={() => addToFavorites(movie.id)}>
                   <MdFavorite className={`${styles.icon} ${styles.notFavorite}`} />
                </Button>
               )}
          </div>               
        </li>
      ))}
    </ul>
  );
};