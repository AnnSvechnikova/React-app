import { createSlice} from '@reduxjs/toolkit';
import {
    getBooksAction, getBookByIdAction, getBookByNameAction,
    getBooksPriceRangeAction, patchBookAction, postBookAction, deleteBookAction
} from '../actions/books';

const initialState = {
    getBooksStatus: 'initial',
    getBookByIdStatus: 'initial',
    getBooksPriceRangeStatus: 'initial',
    postBookStatus: 'initial',
    patchBookStatus: 'initial',
    deleteBookStatus: 'initial',
    books: [],
    booksPriceRange: {},
    error: null,
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooksAction.pending, (state) => {
                state.getBooksStatus = 'fetching';
                state.error = null;
            })
            .addCase(getBooksAction.fulfilled, (state, { payload }) => {
                state.getBooksStatus = 'fetched';
                state.books = payload;
                state.error = null;
            })
            .addCase(getBooksAction.rejected, (state, { error }) => {
                state.getBooksStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(getBookByIdAction.pending, (state) => {
                state.getBookByIdStatus = 'fetching';
                state.error = null;
            })
            .addCase(getBookByIdAction.fulfilled, (state, { payload }) => {
                state.getBookByIdStatus = 'fetched';
                state.books = payload;
                state.error = null;
            })
            .addCase(getBookByIdAction.rejected, (state, { error }) => {
                state.getBookByIdStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(getBookByNameAction.pending, (state) => {
                state.getBookByNameStatus = 'fetching';
                state.error = null;
            })
            .addCase(getBookByNameAction.fulfilled, (state, { payload }) => {
                state.getBookByNameStatus = 'fetched';
                state.books = payload;
                state.error = null;
            })
            .addCase(getBookByNameAction.rejected, (state, { error }) => {
                state.getBookByNameStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(getBooksPriceRangeAction.pending, (state) => {
                state.getBooksPriceRangeStatus = 'fetching';
                state.error = null;
            })
            .addCase(getBooksPriceRangeAction.fulfilled, (state, { payload }) => {
                state.getBooksPriceRangeStatus = 'fetched';
                state.booksPriceRange = payload;
                state.error = null;
            })
            .addCase(getBooksPriceRangeAction.rejected, (state, { error }) => {
                state.getBooksPriceRangeStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(postBookAction.pending, (state) => {
                state.postBookStatus = 'fetching';
                state.error = null;
            })
            .addCase(postBookAction.fulfilled, (state, { payload }) => {
                state.postBookStatus = 'fetched';
                state.books = payload;
                state.error = null;
            })
            .addCase(postBookAction.rejected, (state, { error }) => {
                state.postBookStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(patchBookAction.pending, (state) => {
                state.patchBookStatus = 'fetching';
                state.error = null;
            })
            .addCase(patchBookAction.fulfilled, (state, { payload }) => {
                state.patchBookStatus = 'fetched';
                state.books = payload;
                state.error = null;
            })
            .addCase(patchBookAction.rejected, (state, { error }) => {
                state.patchBookStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(deleteBookAction.pending, (state) => {
                state.deleteBookStatus = 'fetching';
                state.error = null;
            })
            .addCase(deleteBookAction.fulfilled, (state, { payload }) => {
                state.deleteBookStatus = 'fetched';
                state.error = null;
            })
            .addCase(deleteBookAction.rejected, (state, { error }) => {
                state.deleteBookStatus = 'error';
                state.error = error;
            });
    },
});

export const resetBooksState = booksSlice.actions.reset;
export const booksReducer = booksSlice.reducer;