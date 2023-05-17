import React, {useEffect} from "react";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import Table from "react-bootstrap/Table"
import OrderCard from "../../components/OrderCard";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersAction} from "../../store/actions/orders";
import {useLoader} from "../../hooks/useLoader.js";
import {resetOrderState} from "../../store/reducers/orders";
import {getBooksAction} from "../../store/actions/books";
import OrderRow from "../../components/OrderRow";
import "./CartPage.css";
import {Loader} from "../../components/Loader";


const CartPage = () => {
    const {orders, bookInfo, getOrdersStatus, getBookInfoStatus} = useSelector((store) =>store.ordersReducer)
    const {books, getBooksStatus}=useSelector((store)=>store.booksReducer)
    const {user, isAuthorized } = useSelector((store) => store.userReducer);
    const dispatch =useDispatch();

    useEffect(()=>{
        if (getBooksStatus==='initial')
            dispatch(getBooksAction());
    },[getBooksStatus, dispatch])
    useEffect(()=>{
        if (getOrdersStatus==='initial')
        {console.log(user.id);
            dispatch(getOrdersAction({user_id: user.user_id, state:'CREATED'}));}
    },[getOrdersStatus, dispatch])
    useLoader([getOrdersStatus, getBooksStatus]);
    useEffect( ()=>() => {dispatch(resetOrderState());}, [dispatch]);
    return(
        <div className="container">
            <p className="greet">Здравствуйте, {user.full_name}! Ваши актуальные заказы:</p>
            <Container className="book-list">
                <Row xs={4} md={4} className="g-4">
                    {Array.from(orders)?.map((item, index) => {
                        return (
                            <Col key={index}>
                                <OrderCard {...item}/>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
};

export default CartPage;

/*<Row xs={4} md={4} className="g-4">
    {Array.from(orders)?.map((item, index) => {
        return (
            <Col key={index}>
                <OrderCard {...item}/>
            </Col>
        )
    })}
</Row>*/

/*return (
            <div className="cart">
                <Container className="orders">
                    <Table>
                        <thead className="title">
                        <tr>
                            <th>№</th>
                            <th>Книга</th>
                            <th>Кол-во</th>
                            <th>Цена</th>
                            <th>Итого</th>
                            <th>Дата заказа</th>
                            <th>Дата оплаты</th>
                            <th>Дата доставки</th>
                            <th>Статус</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from(orders)?.map((item, index) => {
                            return (
                                <OrderRow {...item} />
                            )
                        })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );*/