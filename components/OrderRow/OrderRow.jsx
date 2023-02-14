import React,  {useCallback, useContext, useEffect, useState} from "react";
import './OrderRow.css';
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersAction, postOrderAction, getBookInfoAction, deleteOrderAction} from "../../store/actions/orders";
import {getBooksAction} from "../../store/actions/books";
import {get} from "axios";


const OrderRow = ({order_id, book_id, amount, order_date, pay_date, deliv_date, state}) => {
    //const {bookInfo, getBookInfoStatus}=useSelector((store)=>store.ordersReducer)
    ///console.log(book_id);
    const {deleteOrderStatus}= useSelector((store)=>store.ordersReducer)
    const dispatch=useDispatch();
    const {books, getBooksStatus}=useSelector((store) =>store.booksReducer);
    const { isAuthorized } = useSelector((store) => store.authReducer);
    useEffect(() => {
        if(getBooksStatus==='initial')
            dispatch(getBooksAction());
    },[getBooksStatus, dispatch]);
    const deleteCard =useCallback(()=>{
        console.log(order_id);
        dispatch(deleteOrderAction(order_id));
    },[deleteOrderStatus,dispatch])
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
            <th><button className="cardButton"  onClick={deleteCard}>-</button></th>
        </tr>
    )
}


export default OrderRow;

/*<th>{bookInfo.title}</th>
<th>{bookInfo.price}</th>
<th>{amount*bookInfo.price}</th>
*/