import { Suspense, useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { getMovieById } from "../components/API/tmdbApi";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { Loader } from "../components/Loader/Loader";
import HomePageBtn from "../components/HomePageBtn/HomePageBtn";
import { MovieCard } from "../components/MovieCard/MovieCard";
import { AdditionalInfo } from "../components/AdditionalInfo/AdditionalInfo";

export default function MovieDetailsPage() {
  const { movieId } = useParams(); //отримуєм параметр movieId з URL-адреси
  //збереження даних про фільм (movie), стану завантаження (loading) і наявності помилки (error).
  const [movie, setMovie] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(false);

  //для виклику функції fetchData після першого рендерингу компоненту і підписки на зміну movieId. У цій функції відбувається запит до API для отримання даних про фільм за його ідентифікатором.
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const fetchedMovie = await getMovieById({
          abortController: controller,
          movieId,
        });
        setMovie(fetchedMovie);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <main>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {movie && (
        <div className="container">
          <HomePageBtn />

          <MovieCard movie={movie} />

          <AdditionalInfo />
{/* Використання компонента Suspense для відображення додаткової інформації про фільм, яка може бути динамічно завантажена (наприклад, додаткові деталі або коментарі). Компонент Outlet використовується для відображення дочірніх маршрутів, які вказуються у вкладеній маршрутизації (наприклад, /details/reviews для відображення відгуків). Якщо дочірній маршрут не знайдено, відображається компонент, вказаний в атрибуті fallback. */}
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </main>
  );
}