import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "../Loader/Loader";

const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const MyFavoriteMoviesPage = lazy(() => import("../../pages/MyFavoriteMoviesPage"))
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const NavBar = lazy(() => import("../Navbar/Navbar"));
const Cast = lazy(() => import("../Cast/Cast"));
const Reviews = lazy(() => import("../Reviews/Reviews"));

export default function App() {
  return (
    <div>
      <NavBar />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/favorite" element={<MyFavoriteMoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}