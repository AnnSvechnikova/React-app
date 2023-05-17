import React,  {useCallback, useContext, useEffect, useState} from "react";
import './OrderRow.css';
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersAction, postOrderAction, getBookInfoAction, deleteOrderAction, patchOrderAction} from "../../store/actions/orders";
import {getBooksAction} from "../../store/actions/books";
import {get} from "axios";
import {OrderStates} from "../../api/services/orders";
import {Loader} from "../Loader";


const OrderRow = ({order_id, book_id, amount, order_date, pay_date, deliv_date, state}) => {
    //const {bookInfo, getBookInfoStatus}=useSelector((store)=>store.ordersReducer)
    const {deleteOrderStatus, patchOrderStatus}= useSelector((store)=>store.ordersReducer)
    const dispatch=useDispatch();
    const {books, getBooksStatus}=useSelector((store) =>store.booksReducer);
    const { isAuthorized } = useSelector((store) => store.userReducer);
    useEffect(() => {
        if(getBooksStatus==='initial')
            dispatch(getBooksAction());
    },[getBooksStatus, dispatch]);
    const cancelOrder = useCallback((order_id)=>{
        console.log(order_id);
        dispatch(
            patchOrderAction({
                order_id:order_id,
                book_id:book_id,
                amount:amount,
                order_date:order_date,
                pay_date:null,
                deliv_date:null,
                state:OrderStates.CANCELLED
            })
        )
    },[dispatch, patchOrderStatus])

    return (
        <tr className="row">
            <th>{order_id}</th>
            <th>{books.find(b=> b.book_id === book_id).title}</th>
            <th>{amount}</th>
            <th>{books.find(b=> b.book_id === book_id).price}</th>
            <th>{amount*books.find(b=> b.book_id === book_id).price}</th>
            <th>{order_date}</th>
            <th>{pay_date}</th>
            <th>{deliv_date}</th>
            <th>{state}</th>
            <th><button className="cardButton" onClick={cancelOrder}>-</button></th>
        </tr>
    )
}


export default OrderRow;

/*<th>{bookInfo.title}</th>
<th>{bookInfo.price}</th>
<th>{amount*bookInfo.price}</th>
*/