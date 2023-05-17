import {createAsyncThunk} from "@reduxjs/toolkit";
import {getOrders, postOrder, deleteOrder, getBookInfo, patchOrder, getOrderStates, getOrderById} from "../../api/services/orders";

export const getOrdersAction = createAsyncThunk('orders/orders',(params)=>{
    return getOrders(params);
})

export const postOrderAction = createAsyncThunk('orders/postOrder',(params)=>{
    return postOrder(params);
})

export const deleteOrderAction = createAsyncThunk('orders/deleteOrder',(id)=>{
    return deleteOrder(id);
})

export const getBookInfoAction = createAsyncThunk('orders/getBookInfo', (params)=>{
    return getBookInfo(params);
} )

export const patchOrderAction = createAsyncThunk('orders/edit', (params) =>{
    return patchOrder(params);
})

export const getStatesAction = createAsyncThunk('orders/states', (params)=>{
    return getOrderStates(params);
})

export const getOrderByIdAction = createAsyncThunk('orders/id', (id)=>{
    return getOrderById(id);
})