import React, {useEffect} from "react";
import {Col, Container, Nav,  Navbar} from "react-bootstrap";
import Table from "react-bootstrap/Table"
import ChosenCard from "../../components/ChosenCard";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersAction} from "../../store/actions/orders";
import {useLoader} from "../../hooks/useLoader.js";
import {resetOrderState} from "../../store/reducers/orders";
import {getBooksAction} from "../../store/actions/books";
import OrderRow from "../../components/OrderRow";
import "./CartPage.css";


const CartPage = () => {
    const {orders, bookInfo, getOrdersStatus, getBookInfoStatus} = useSelector((store) =>store.ordersReducer)
    //const {books, getBooksStatus}=useSelector((store)=>store.booksReducer)
    const dispatch =useDispatch();
    const { isAuthorized } = useSelector((store) => store.authReducer);
    useEffect(()=>{
        if (getOrdersStatus==='initial')
            dispatch(getOrdersAction());
    },[getOrdersStatus, isAuthorized, dispatch])

    //useLoader([getPurchaseStatus])
    useEffect( () => {dispatch(resetOrderState());}, [dispatch]);
    if(!isAuthorized)
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Container className="navigation">
                        <Nav.Link className="nlink" href="/">Главная страница</Nav.Link>
                        <Nav.Link className="nlink">Корзина</Nav.Link>
                    </Container>
                </Navbar>
                <div>Для просмотра списка заказов необходимо авторизоваться!</div>
            </div>
        )
    else
        return (

            <div>
                <Navbar bg="light" expand="lg">
                    <Container className="navigation">
                        <Nav.Link className="nlink" href="/">Главная страница</Nav.Link>
                        <Nav.Link className="nlink">Корзина</Nav.Link>
                    </Container>
                </Navbar>
                <Container className="ordrs">
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
        );
};

export default CartPage;

/*<Row xs={4} md={4} className="g-4">
    {Array.from(orders)?.map((item, index) => {
        return (
            <Col key={index}>
                <ChosenCard {...item}/>
            </Col>
        )
    })}
</Row>*/