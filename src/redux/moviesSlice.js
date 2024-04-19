// Цей slice буде містити дані про фільми, такі як items, isLoading та error.
import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, addMovies, deleteMovies } from "./operations";

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, handlePending)
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchMovies.rejected, handleRejected)
            .addCase(addMovies.pending, handlePending)
            .addCase(addMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addMovies.rejected, handleRejected)
            .addCase(deleteMovies.pending, handlePending)
            .addCase(deleteMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(
                    (movie) => movie.id === action.payload.id
                );
                state.items.splice(index, 1);
            })
            .addCase(deleteMovies.rejected, handleRejected);
    },
});
const moviesReducer = moviesSlice.reducer;
export default moviesReducer;