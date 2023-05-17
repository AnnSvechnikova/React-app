import React, {useCallback, useEffect, useState} from "react";
import {Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";
import Table from "react-bootstrap/Table"
import OrderCard from "../../components/OrderCard";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersAction, getStatesAction} from "../../store/actions/orders";
import {useLoader} from "../../hooks/useLoader.js";
import {resetOrderState} from "../../store/reducers/orders";
import {getBooksAction} from "../../store/actions/books";
import {getUsersAction} from "../../store/actions/users";
import OrderRow from "../../components/OrderRow";
import "./OrdersPage.css";
import {Loader} from "../../components/Loader";
import {Field} from "react-final-form";
import InputField from "../../components/InputField";
import {OrderStates} from "../../api/services/orders";
import DateInput from "../../components/DateInput";

const OrdersPage = () => {
    const {orders, isLoading, bookInfo, getOrdersStatus, getBookInfoStatus, states, getStatesStatus} = useSelector((store) =>store.ordersReducer)
    const {books, getBooksStatus}=useSelector((store)=>store.booksReducer)
    const {user, users, getUsersStatus} = useSelector((store) => store.userReducer);
    const dispatch =useDispatch();
    //const [dat, setDat] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchMinValue, setSearchMinValue] = useState('');
    const [searchMaxValue, setSearchMaxValue] = useState('');
    useEffect(()=>{
        if (getBooksStatus==='initial')
            dispatch(getBooksAction());
    },[getBooksStatus, dispatch]);
    useEffect(()=>{
        if (getStatesStatus==='initial')
            dispatch(getStatesAction());
    },[getStatesStatus, dispatch]);
    useEffect(()=>{
        if (getOrdersStatus==='initial')
        {console.log(user.id);
            dispatch(getOrdersAction({user_id: user.user_id}));}
    },[getOrdersStatus, dispatch])
    useEffect(()=> {
        if (getUsersStatus ==='initial')
            dispatch(getUsersAction());
    },[getUsersStatus,dispatch])

    const handleSearchDate = useCallback((min, max)=>() => {
        dispatch(getOrdersAction({
            minDate: min,
            maxDate: max
        }))}, [dispatch])
    const handleStateFilter = useCallback((filter_status)=>() => {
        console.log(filter_status);
        dispatch(getOrdersAction({
            state: filter_status,
        }))}, [dispatch])

    useEffect( ()=>() => {dispatch(resetOrderState());}, [dispatch]);
    //useLoader([getOrdersStatus, getBooksStatus, getStatesStatus]);
    if (orders) return(
        <div className="container">
            <Loader/>
            <p className="greet">Здравстуйте, {user.full_name}! Полный список заказов:</p>
            <div className='dateFilter'>
                <p>Диапазон дат оформления:</p>
                <DateInput minvalue={searchMinValue} setMinValue={setSearchMinValue}
                           maxValue={searchMaxValue} setMaxValue={setSearchMaxValue}
                           onSubmit={handleSearchDate(searchMinValue, searchMaxValue)} loading={isLoading} />
                <button className='filterButton' onClick={handleSearchDate()}>Сброс</button>
            </div>
            <div className="orderFilter">
                <p>Выберите статус:</p>
                <button className='filterButton' onClick={handleStateFilter(OrderStates.CREATED)}>{OrderStates.CREATED}</button>
                <button className='filterButton' onClick={handleStateFilter(OrderStates.CANCELLED)}>{OrderStates.CANCELLED}</button>
                <button className='filterButton' onClick={handleStateFilter(OrderStates.PAID)}>{OrderStates.PAID}</button>
                <button className='filterButton' onClick={handleStateFilter(OrderStates.DELIVERED)}>{OrderStates.DELIVERED}</button>
                <button className='filterButton' onClick={handleStateFilter()}>Сброс</button>
            </div>

            <Container className="orderList">
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

export default OrdersPage;


/*<button className='filterButton' onClick={handleStateFilter(states[0]["value"])}>{states[0]["label"]}</button>
                <button className='filterButton' onClick={handleStateFilter(states[1]["value"])}>{states[1]["label"]}</button>
                <button className='filterButton' onClick={handleStateFilter(states[2]["value"])}>{states[2]["label"]}</button>
                <button className='filterButton' onClick={handleStateFilter(states[3]["value"])}>{states[3]["label"]}</button>
                <button className='filterButton' onClick={handleStateFilter()}>Сброс</button>*/

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
