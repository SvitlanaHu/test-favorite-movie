import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiMockapi from "../services/apiMockapi.js";

export const fetchMovies = createAsyncThunk(
    "movies/fetchAll",
    async (showedMovies, thunkAPI) => {
        try {
            const response = await apiMockapi("/movies");
            response.moviesCount = response.data.length;
            const { data, moviesCount } = response;
            const editedData = data.slice(0, showedMovies)
            const EditedResponse = { data: editedData, moviesCount }
            return EditedResponse;
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
