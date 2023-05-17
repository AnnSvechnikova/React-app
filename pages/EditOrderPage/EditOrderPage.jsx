import {Card} from "react-bootstrap";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {patchOrderAction, getOrderByIdAction, getBookInfoAction} from "../../store/actions/orders";
import {getBookByIdAction} from "../../store/actions/books";
import {OrderStates} from "../../api/services/orders";
import {patch} from "axios";
import {Link, useParams} from "react-router-dom";
import {Field, Form} from "react-final-form";
import {setDate, addDays} from "../../components/BookCard/BookCard.jsx"
import {Loader} from "../../components/Loader";

const EditOrderPage = () => {
    let {order_id} = useParams();

    const {books, getBooksStatus}=useSelector((store)=>store.booksReducer)
    const {orders, getOrderByIdStatus, getBookByIdStatus, patchOrderStatus, getOrdersStatus}= useSelector((store)=>store.ordersReducer)
    const {users, user} =useSelector((store)=>store.userReducer)
    const dispatch =useDispatch();

    const ord = Array.from(orders).find((o)=>(o.order_id===Number(order_id)));
    console.log(ord);
    const bk = Array.from(books).find((b)=>b.book_id===Number(ord.book_id));
    const usr = Array.from(users).find((u)=>u.user_id===ord.user_id);

    /*useEffect(()=>{
        if (getOrderByIdStatus==='initial') {
            dispatch(getOrderByIdAction(order_id));
        }
    },[getOrderByIdStatus,dispatch]);

    useEffect(()=>{
        if(getBookByIdStatus==='initial'){
            dispatch(getBookByIdAction(orders.book_id));
        }
    },[getBookByIdStatus, dispatch]);*/
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
        (values)=> () =>{
            dispatch(
                patchOrderAction({
                    order_id: order_id,
                    user_id: ord.user_id,
                    book_id: ord.book_id,
                    amount: values?.amount ?? ord.amount,
                    state: ord.state,
                    order_date: ord.order_date,
                    deliv_date: setDate(new Date()),
                    pay_date: null,
                }));
        },
        [getOrdersStatus, patchOrderStatus, dispatch]
    );
    const cancelOrder = useCallback(()=>{
            dispatch(patchOrderAction({
                order_id: order_id,
                user_id: ord.user_id,
                book_id: ord.book_id,
                amount: ord.amount,
                order_date: ord.order_date,
                pay_date: null,
                deliv_date: null,
                state: "CANCELLED"
            }));
        },
        [getOrderByIdStatus, patchOrderStatus, dispatch]);
    return <Card className="card">
        <Loader></Loader>
        <Card.Body className="orderCardBody">
            <div className="book">
                <Link to={`/books/${ord.book_id}/`} className= "link">{bk.title}</Link>
            </div>
            <div  className="book">
                <Card.Text className="book">
                    <p>{bk.price * orders.amount} руб.</p>
                    <Form onSubmit={patchAmount}>
                    {({ handleSubmit}) => (
                        <form onSubmit={handleSubmit} className='form'>
                            <Field name="amount">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder="количество"
                                        className='input'
                                        type='number'
                                        defaultValue={orders.amount}
                                    />
                                )}
                            </Field>
                            <button className='button' type="submit">
                                Сохранить
                            </button>
                        </form>
                            )}
                    </Form>
                    {users.is_staff?(<p>Клиент: {usr.full_name}</p>):(<></>)}
                    <p>Номер заказа: {ord.order_id}</p>
                    <p>Оформлен: {ord.order_date}</p>
                    <p>Дата доставки: {ord.deliv_date? ord.deliv_date: ("уточняется")}</p>
                    <p>Дата получения: {ord.state === OrderStates.PAID? ord.pay_date: ("еще не получен")}</p>
                    <p>Статус: {ord.state}</p>
                    <button className="cardButton"  onClick={cancelOrder} disabled={!(ord.state === 'CREATED')}>-</button>
                    {ord.state===OrderStates.CREATED ? (<button className="cardButton" onClick={setDelivState(order_id)}>Доставлен в магазин</button>):(<></>)}
                    {ord.state===OrderStates.DELIVERED ? (<button className="cardButton" onClick={setPaidState(order_id)}>Оплачен и выдан</button>):(<></>) }
                </Card.Text>
            </div>
        </Card.Body>
    </Card>

}

export default EditOrderPage;