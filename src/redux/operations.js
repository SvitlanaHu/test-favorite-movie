import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://66217cda27fcd16fa6c71982.mockapi.io";

export const fetchMovies = createAsyncThunk(
    "movies/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/movies");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addMovies = createAsyncThunk(
    "movies/addMovies",
    async (movie, thunkAPI) => {
        try {
            const response = await axios.post("/movies", movie);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteMovies = createAsyncThunk(
    "movies/deleteMovies",
    async (movieId, thunkAPI) => {
        try {
            const response = await axios.delete(`/movies/${movieId}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
