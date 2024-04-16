import { Link, useLocation } from "react-router-dom";
import styles from "./MoviesList.module.css";

export const MoviesList = ({ films }) => {
  const location = useLocation();
  const defaultImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjdn4c3Gb3xX-8vCDtC7SDbRDjTNjufAbrDg&usqp=CAU";

  return (
    <ul className={styles.list}>
      {films.map((film) => (
        <li key={film.id}>
            <img src={film.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${film.backdrop_path}`
                      : defaultImg
                     }
            alt={film.title}
            className={styles.img} />
          
          <div>
            <Link to={`/movies/${film.id}`} state={location} className={styles.link}>
              {film.title}
            </Link>
              
              <div className={styles.rating}>
                <p>Рейтинг: {film.rating}</p>
                <p>Дата виходу: {film.release_date}</p>
              </div>
            </div>
               
        </li>
      ))}
    </ul>
  );
};