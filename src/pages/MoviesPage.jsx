import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm/SearchForm";
import { Loader } from "../components/Loader/Loader";
import { searchMoviesByKeyword } from "../components/API/tmdbApi";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { MoviesList } from "../components/MoviesList/MoviesList";

const MoviesPage = () => {
  //Використання станів за допомогою хуків useState для збереження результатів пошуку (searchResults), стану завантаження (loading) і наявності помилки (error).
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //Використання хука useSearchParams для отримання параметрів пошуку з URL-адреси.
  const [params, setParams] = useSearchParams();  

  //Функція changeParams використовується для зміни параметрів пошуку в URL-адресі. Вона оновлює параметр "query" на основі нових параметрів і оновлює URL.
  const changeParams = (newParams) => {
    params.set("query", newParams);
    setParams(params);
  };

  //Використання ефекту useEffect для виклику функції fetchSearchResults після першого рендерингу компоненту і підписки на зміну параметрів пошуку. У цій функції відбувається запит до API для отримання списку фільмів за ключовим словом пошуку.
    useEffect(() => {
      const controller = new AbortController();
      const query = params.get("query") ?? "";
      const fetchSearchResults = async () => {          
        if (query) {
          setLoading(true);
          try {
            setError(false);
            const response = await searchMoviesByKeyword({
              keyword: query,
              abortController: controller,
            });
            setSearchResults(response);
          } catch (error) {
            if (error.code !== "ERR_CANCELED") {
              setError(true);
            }
          } finally {
            setLoading(false);
          }
        }
    };

    fetchSearchResults();
    return () => {
      controller.abort();
    };
  }, [params]);

  return (
    <main>
      {error && <ErrorMessage />}
      <SearchForm onSearch={changeParams} />
      {loading && <Loader />}
      <MoviesList movies={searchResults} />
    </main>
  );
};

export default MoviesPage;
