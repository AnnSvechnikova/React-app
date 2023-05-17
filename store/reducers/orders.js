import {createSlice} from "@reduxjs/toolkit";
import {
    getOrdersAction,
    deleteOrderAction,
    postOrderAction,
    getBookInfoAction,
    patchOrderAction,
    getStatesAction,
    getOrderByIdAction
} from "../actions/orders";

const initialState = {
    getOrdersStatus: 'initial',
    postOrderStatus: 'initial',
    deleteOrderStatus: 'initial',
    getBookInfoStatus: 'initial',
    patchOrderStatus: 'initial',
    getStatesStatus: 'initial',
    getOrderByIdStatus: 'initial',
    orders: [],
    bookInfo: [],
    error: null,
    states: [],
};
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersAction.pending, (state) => {
                state.getOrdersStatus = 'fetching';
                state.error = null;
            })
            .addCase(getOrdersAction.fulfilled, (state, { payload }) => {
                state.getOrdersStatus = 'fetched';
                state.orders = payload;
                state.error = null;
            })
            .addCase(getOrdersAction.rejected, (state, { error }) => {
                state.getOrdersStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(getOrderByIdAction.pending, (state) => {
                state.getOrderByIdStatus = 'fetching';
                state.error = null;
            })
            .addCase(getOrderByIdAction.fulfilled, (state, { payload }) => {
                state.getOrderByIdStatus = 'fetched';
                state.orders = payload;
                state.error = null;
            })
            .addCase(getOrderByIdAction.rejected, (state, { error }) => {
                state.getOrderByIdStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(postOrderAction.pending, (state) => {
                state.postOrderStatus = 'fetching';
                state.error = null;
            })
            .addCase(postOrderAction.fulfilled, (state, { payload }) => {
                state.postOrderStatus= 'fetched';
                state.orders = payload;
                state.error = null;
            })
            .addCase(postOrderAction.rejected, (state, { error }) => {
                state.postOrderStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(deleteOrderAction.pending, (state) => {
                state.deleteOrderStatus = 'fetching';
                state.error = null;
            })
            .addCase(deleteOrderAction.fulfilled, (state, { payload }) => {
                state.deleteOrderStatus = 'fetched';
                state.orders = payload;
                state.error = null;
            })
            .addCase(deleteOrderAction.rejected, (state, { error }) => {
                state.deleteOrderStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(getBookInfoAction.pending, (state) => {
                state.getBookInfoStatus = 'fetching';
                state.error = null;
            })
            .addCase(getBookInfoAction.fulfilled, (state, { payload }) => {
                state.getBookInfoStatus = 'fetched';
                state.bookInfo = payload;
                state.error = null;
            })
            .addCase(getBookInfoAction.rejected, (state, { error }) => {
                state.getBookInfoStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(patchOrderAction.pending, (state) => {
                state.patchOrderStatus = 'fetching';
                state.error = null;
            })
            .addCase(patchOrderAction.fulfilled, (state, { payload }) => {
                state.patchOrderStatus = 'fetched';
                state.order = state.orders.filter((order) => order.order_id !== payload.id);
                state.error = null;
            })
            .addCase(patchOrderAction.rejected, (state, { error }) => {
                state.patchOrderStatus = 'error';
                state.error = error;
            });
        builder
            .addCase(getStatesAction.pending, (state) => {
                state.getStatesStatus = 'fetching';
                state.error = null;
            })
            .addCase(getStatesAction.fulfilled, (state, { payload }) => {
                state.getStatesStatus = 'fetched';
                state.states = payload
                state.error = null;
            })
            .addCase(getStatesAction.rejected, (state, { error }) => {
                state.getStatesStatus = 'error';
                state.error = error;
            });
    },
});

export const resetOrderState = ordersSlice.actions.reset;
export const ordersReducer = ordersSlice.reducer;