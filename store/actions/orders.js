import {createAsyncThunk} from "@reduxjs/toolkit";
import {getOrders, postOrder, deleteOrder, getBookInfo} from "../../api/services/orders";

export const getOrdersAction = createAsyncThunk('orders/orders',()=>{
    return getOrders();
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