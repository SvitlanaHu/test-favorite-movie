import { Link, useLocation } from "react-router-dom";
import styles from "./MoviesList.module.css";

export const MoviesList = ({ films }) => {
  const location = useLocation();
  const defaultImg =
    "https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700";

  return (
    <ul className={styles.list}>
      {films.map((film) => (
        <li key={film.id}>
          <Link to={`/movies/${film.id}`} state={location} className={styles.link}>
            <img src={film.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${film.backdrop_path}`
                      : defaultImg
                     } alt={film.title} />
            <div>
              <h3>{film.title}</h3>
              <div className={styles.rating}>
                <p>Рейтинг: {film.rating}</p>
                <p>Дата виходу: {film.release_date}</p>
              </div>
            </div>
          </Link>      
        </li>
      ))}
    </ul>
  );
};