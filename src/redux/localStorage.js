import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

//Функція loadState завантажує стан із локального сховища за ключем 'favorites' і повертає його.
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('favorites');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

//Функція saveState приймає стан як аргумент, серіалізує його та зберігає у локальному сховищі під ключем 'favorites'.
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('favorites', serializedState);
    } catch {
        // ignore write errors
    }
};

const preloadedState = loadState();

const store = configureStore({
    reducer: rootReducer,
    preloadedState,
});

//Магазин Redux підписується на зміни стану за допомогою методу subscribe. Кожного разу, коли стан змінюється, виконується функція, яка зберігає усі дані стану, що відносяться до функціональності улюблених продуктів.
store.subscribe(() => {
    saveState({
        favorite: store.getState().favorite,
    });
});

// Функція для збереження фільтрів у localStorage
export function saveFilters(filters) {
    localStorage.setItem('movieFilters', JSON.stringify(filters));
}

// Функція для отримання фільтрів з localStorage
export function getFilters() {
    const savedFilters = localStorage.getItem('movieFilters');
    return savedFilters
        ? JSON.parse(savedFilters)
        : { keyword: null, category: null, page: 1, limit: 6 };
}

// Функція для оновлення певного фільтра
export function updateFilter(key, value) {
    const filters = getFilters();
    filters[key] = value;
    saveFilters(filters);
}