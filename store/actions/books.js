import {createAsyncThunk} from "@reduxjs/toolkit";
import {getBooks, getBookById, getBookByName, getBooksPriceRange} from "../../api/services/books";

export const getBooksAction = createAsyncThunk('books/books', (params)=>{
    return getBooks(params);
})

export const getBookByIdAction = createAsyncThunk('books/bookId', (id)=>{
    return getBookById(id);
})

export const getBookByNameAction = createAsyncThunk('books/bookName', (name)=>{
    return getBookByName(name);
})

export const getBooksPriceRangeAction = createAsyncThunk('books/booksPriceRange', () =>{
    return getBooksPriceRange();
})