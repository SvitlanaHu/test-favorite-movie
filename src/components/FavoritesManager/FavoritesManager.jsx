import { useState } from "react";
import { MoviesListCard } from '../MoviesListCard/MoviesListCard'

const FavoritesManager = () => {
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
    <div>
      {/* Передаємо функції addToFavorites та removeFromFavorites як пропси до MoviesListCard */}
      <MoviesListCard 
        addToFavorites={addToFavorites} 
        removeFromFavorites={removeFromFavorites} 
      />
    </div>
  );
};

export default FavoritesManager;