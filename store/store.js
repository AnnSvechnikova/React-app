import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/auth";
import {booksReducer} from "./reducers/books";
import {loaderReducer} from "./reducers/loader";
import {ordersReducer} from "./reducers/orders";
import {userReducer} from "./reducers/users";


const reducer = combineReducers({
    booksReducer,
    loaderReducer,
    ordersReducer,
    authReducer,
    userReducer,
})

export const store = configureStore({
    reducer
})