import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: [],
    reducers: {
        addToFavorites: (state, action) => {
            const movieId = action.payload;
            if (!state.includes(movieId)) {
                state.push(movieId);
            }
        },
        removeFromFavorites: (state, action) => {
            const movieId = action.payload;
            return state.filter((id) => id !== movieId);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;