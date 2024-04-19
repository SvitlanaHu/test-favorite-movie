import { useEffect, useState } from "react";
import { getPopular } from "../components/API/tmdbApi";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { Loader } from "../components/Loader/Loader";
import { MoviesList } from "../components/MoviesList/MoviesList";

export default function HomePage() {
  const [popularmovies, setPopularmovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPopular() {
      try {
        setLoading(true);
        setError(false);
        const fetchedmovies = await getPopular({
          abortController: controller,
        });
        setPopularmovies(fetchedmovies);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {popularmovies.length > 0 && <p>Trending today</p> && (
        <MoviesList movies={popularmovies} />
      )}
    </main>
  );
}