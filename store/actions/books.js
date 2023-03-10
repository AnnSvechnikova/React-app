import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    getBooks,
    getBookById,
    getBookByName,
    getBooksPriceRange,
    postBook,
    patchBookById,
    deleteBook
} from "../../api/services/books";

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

export const postBookAction = createAsyncThunk('books/postBook', (params)=>{
    return postBook(params)
})

export const patchBookAction = createAsyncThunk('books/patchBook', (params)=>{
    return patchBookById(params);
})

export const deleteBookAction = createAsyncThunk('books/deleteBook', (id) =>{
    return deleteBook(id);
})