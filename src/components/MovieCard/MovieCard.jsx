import styles from "./MovieCard.module.css";

export const MovieCard = ({ movie }) => {
  const defaultImg =
    "https://doingwell.mit.edu/wp-content/uploads/2023/10/Movie-Night.jpeg";
  return (
    <div className={styles.card}>
      <img
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            : defaultImg
        }
        alt="poster"
        className={styles.img}
      />

      <div className={styles.descBlock}>
        <p className={styles.title}>
          {movie.title} ({movie.release_date.slice(0, 4)})
        </p>
        <p>Movie Popularity: {movie.popularity.toFixed(1)}%</p>
        <p className={styles.overview}>Опис</p>
        <p>{movie.overview}</p>
        <p>Рейтинг: {movie.rating}</p>
        <p>Дата виходу: {movie.release_date}</p>
        <p className={styles.gerres}>Жанр</p>
        <p>{movie.genres.map((item) => item.name).join(", ")}</p>
        <p>Директор: {movie.director}</p>
      </div>
    </div>
  );
};