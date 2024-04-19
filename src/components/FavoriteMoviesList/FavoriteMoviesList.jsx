import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdFavorite } from "react-icons/md";
import { selectFilteredMovies, selectFavorite } from "../../redux/selector";
import styles from "./styles.module.css";
import { Button } from "../Button/Button";

const FavoriteMoviesList = ({ removeFromFavorites }) => {
  const filteredMovies = useSelector(selectFilteredMovies);
  const favoriteMovies = useSelector(selectFavorite);
  const location = useLocation();
  const defaultImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjdn4c3Gb3xX-8vCDtC7SDbRDjTNjufAbrDg&usqp=CAU";

  // Створюємо стан для зберігання списку улюблених фільмів
  const [favorites, setFavorites] = useState([]);

  // Функція для додавання фільму до списку улюблених
 const addToFavorites = useCallback((movieId) => {
    if (!favorites.includes(movieId)) {
      setFavorites([...favorites, movieId]);
    }
  }, [favorites]);

  // const handleDelete = (id) => {
  //   dispatch(deleteMovies(id));
  // };

  useEffect(() => {
    // Збереження даних улюблених фільмів у localStorage
    localStorage.setItem('favorite', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  useEffect(() => {
    // Завантаження даних улюблених фільмів з localStorage при першому рендері
    const loadFavoriteMovies = () => {
      const favoriteData = localStorage.getItem('favorite');
      if (favoriteData) {
        const parsedData = JSON.parse(favoriteData);
        // Викликайте addToFavorites для кожного фільму в збережених даних
        parsedData.forEach((movieId) => {
          addToFavorites(movieId);
        });
      }
    };
    loadFavoriteMovies();
  }, [addToFavorites]);

  return (
    <ul className="favorites-list">
      {filteredMovies.map((movie) => (
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

export default FavoriteMoviesList;