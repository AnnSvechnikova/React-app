import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/auth";
import {booksReducer} from "./reducers/books";
import {loaderReducer} from "./reducers/loader";
import {ordersReducer} from "./reducers/orders";


const reducer = combineReducers({
    booksReducer,
    loaderReducer,
    ordersReducer,
    authReducer,
})

export const store = configureStore({
    reducer
})