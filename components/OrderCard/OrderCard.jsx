import {Card} from "react-bootstrap";
import React, {useCallback, useEffect} from "react";
import './OrderCard.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteOrderAction, patchOrderAction} from "../../store/actions/orders";
import {getBooksAction, patchBookAction} from "../../store/actions/books";
import {Link} from "react-router-dom";
import {OrderStates} from "../../api/services/orders";
import {setDate} from "../BookCard/BookCard";
import {Field, Form} from "react-final-form";


const OrderCard = ({order_id, book_id}) => {
    const {books, getBooksStatus}=useSelector((store)=>store.booksReducer)
    const {orders, deleteOrderStatus, patchOrderStatus, getOrdersStatus}= useSelector((store)=>store.ordersReducer)
    const {users, user} = useSelector((store)=>store.userReducer)

    const dispatch =useDispatch();
    const ord = Array.from(orders).find((o)=>(o.order_id===Number(order_id)));
    const bk = Array.from(books).find((b)=>b.book_id===Number(book_id));
    const usr = Array.from(users).find((u)=>u.user_id===ord.user_id);
    const setPaidState=useCallback(
        (order_id)=>()=>{
            dispatch(
                patchOrderAction({
                    order_id: ord.order_id,
                    user_id: ord.user_id,
                    book_id: ord.book_id,
                    amount: ord.amount,
                    state: OrderStates.PAID,
                    order_date: ord.order_date,
                    deliv_date: ord.deliv_date,
                    pay_date: setDate(new Date()),

                }));
        },
        [dispatch, getOrdersStatus, patchOrderStatus],
    );
    const setDelivState=useCallback(
        (order_id)=>()=>{
            dispatch(
                patchOrderAction({
                    order_id: order_id,
                    user_id: ord.user_id,
                    book_id: ord.book_id,
                    amount: ord.amount,
                    state: OrderStates.DELIVERED,
                    order_date: ord.order_date,
                    deliv_date: setDate(new Date()),
                    pay_date: null,
                }));
        },
        [dispatch, getOrdersStatus, patchOrderStatus],
    );
    const patchAmount=useCallback(
        (values) =>{
            dispatch(patchOrderAction({
                    order_id: order_id,
                    user_id: ord.user_id,
                    book_id: ord.book_id,
                    amount: values?.amount ?? ord.amount,
                    state: ord.state,
                    order_date: ord.order_date,
                    deliv_date: ord.deliv_date,
                    pay_date: null,
                }));
            dispatch(patchBookAction({
                book_id: ord.book_id,
                title: bk.title,
                in_stock: bk.in_stock - (values.amount - ord.amount),
                descr: bk.descr,
                price: bk.price,
                picture: bk.picture,
            }));
        },
        [dispatch, getOrdersStatus, patchOrderStatus]
    );
    const cancelOrder = useCallback(()=>{
        dispatch(patchOrderAction({
            order_id: Number(order_id),
            user_id: ord.user_id,
            book_id: ord.book_id,
            amount: ord.amount,
            order_date: ord.order_date,
            pay_date: null,
            deliv_date: null,
            state: OrderStates.CANCELLED,
        }));
        },
        [getOrdersStatus, patchOrderStatus, dispatch]);

    if(bk){
    return (<Card className="card">
        <Card.Body className="orderCardBody">
            <div className="book">
                <Link to={`/books/${book_id}/`} className= "link">{bk.title}</Link>
            </div>
            <div  className="book">
                <Card.Text className="book">
                    <p>{bk.price * ord.amount} руб.</p>
                    {user.is_staff && ord.state === OrderStates.CREATED ?
                        (<Form onSubmit={patchAmount}>
                            {({ handleSubmit}) => (
                                <form onSubmit={handleSubmit} className='form'>
                                    <Field name="amount">
                                        {({ input, meta }) => (
                                            <input
                                                {...input}
                                                placeholder={`число экземпляров = ${ord.amount}`}
                                                className='input'
                                                type='number'
                                                defaultValue={ord.amount}
                                            />
                                        )}
                                    </Field>
                                    <button className='button' type="submit">
                                        ок
                                    </button>
                                </form>
                            )}
                        </Form>)
                        :(<p>{ord.amount} шт.</p>)
                    }
                    {user.is_staff?(<p>Клиент: {usr.full_name}</p>):(<></>)}
                    <p>Номер заказа: {ord.order_id}</p>
                    <p>Оформлен: {ord.order_date}</p>
                    <p>Дата доставки: {ord.deliv_date? ord.deliv_date: ("уточняется")}</p>
                    <p>Дата получения: {ord.state === OrderStates.PAID? ord.pay_date: ("не получен")}</p>
                    <p>Статус: {ord.state}</p>
                    <button className="cancelButton"  onClick={cancelOrder}
                            disabled={!((ord.state === OrderStates.CREATED)||(!ord.state === OrderStates.DELIVERED))}>-</button>
                    {user.is_staff && ord.state===OrderStates.CREATED ?
                        (<button className="delivButton" onClick={setDelivState(order_id)}>Доставлен в магазин</button>):
                        (<></>)}
                    {user.is_staff &&ord.state===OrderStates.DELIVERED ?
                        (<button className="paidButton" onClick={setPaidState(order_id)}>Оплачен и выдан</button>):
                        (<></>) }
                </Card.Text>
            </div>
        </Card.Body>
    </Card>)
    }
}

export default OrderCard;
/* <Card.Img className="cardImage" src={BookCard['picture']}/>*/