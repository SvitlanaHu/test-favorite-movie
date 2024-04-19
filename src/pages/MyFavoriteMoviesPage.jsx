// import { useState } from "react";
import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader/Loader";
import { selectError, selectIsLoading } from "../redux/selector"; 
import { fetchMovies } from "../redux/operations";

// const AddEditMovieForm = lazy(() => import("../components/AddEditMovieForm/AddEditMovieForm"));
const FavoriteMovieListWithDB = lazy(() => import("../components/FavoriteMovieListWithDB/FavoriteMovieListWithDB"));

const MyFavoriteMoviesPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <main>
      <Suspense fallback={<Loader />}>
        <h1>My Favorite Movie List</h1>
       
        <FavoriteMovieListWithDB />
        {isLoading && !error && <Loader />}
      </Suspense>
    </main>
  );
};
 
export default MyFavoriteMoviesPage;