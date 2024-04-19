import { createSelector } from "@reduxjs/toolkit";

export const selectMovies = (state) => state.movies.items;

export const selectIsLoading = (state) => state.movies.isLoading;

export const selectError = (state) => state.movies.error;

export const selectFilter = (state) => state.filters.name;

export const selectFavorite = (state) => state.favorite; // Додано стан favorite

export const selectFilteredMovies = createSelector(
    [selectMovies, selectFilter, selectFavorite], // Додано selectFavorite
    (movies, filter, favorite) =>
        movies.filter((movie) =>
            movie.name.toLowerCase().includes(filter.toLowerCase())
        ).map(movie => ({ // Додано об'єднання зі станом favorite
            ...movie,
            isFavorite: favorite.includes(movie.id) // Перевірка чи фільм у списку улюблених
        }))
); 