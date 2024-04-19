import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import moviesReducer from "./moviesSlice";
import filtersReducer from "./filtersSlice";
import favoriteReducer from './favoriteSlice';

const rootReducer = combineReducers({
    movies: moviesReducer,
    filters: filtersReducer,
    favorite: favoriteReducer,
});

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('favorite');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const preloadedState = {
    favorite: loadState(),
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState,
});

store.subscribe(() => {
    localStorage.setItem('favorite', JSON.stringify(store.getState().favorite));
});

export default store;






