import {Breadcrumb, Col, Container, Row, Button, Navbar, Nav} from "react-bootstrap";
import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import BookCard from "../../components/BookCard/BookCard";
import './CatalogPage.css';
import InputField from "../../components/InputField";
import {useDispatch, useSelector} from "react-redux";
import {getBookByNameAction, getBooksAction, getBooksPriceRangeAction} from "../../store/actions/books";
import {resetBooksState} from "../../store/reducers/books";
import MinMaxInput from "../../components/MinMaxInput/MinMaxInput";
import {getOrdersAction} from "../../store/actions/orders";
import {resetOrderState} from "../../store/reducers/orders";


const CatalogPage = () => {
    const{books, isLoading, getBooksStatus, getBooksPriceRangeStatus, booksPriceRange, getBookByNameStatus}=useSelector((store) =>store.booksReducer)
    const { user, isAuthorized } = useSelector((store) => store.userReducer);
    const {orders, getOrderStatus} = useSelector((store) => store.ordersReducer);
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [searchMinValue, setSearchMinValue] = useState('');
    const [searchMaxValue, setSearchMaxValue] = useState('');

    useEffect(()=>{
        if (getOrderStatus==='initial' && user)
        {console.log(user.id)
            dispatch(getOrdersAction({user_id: user?.id}));}
    },[getOrderStatus, orders, dispatch])

    const handleSearch = async () => {
        dispatch(getBookByNameAction(searchValue));
    }

    const handleSearchMinMax = async () => {
            dispatch(getBooksAction({minPrice: searchMinValue, maxPrice: searchMaxValue}));
        }

    /*const handleSearchMinMax = useCallback(() => {
            dispatch(getBooksAction({minPrice: searchMinValue, maxPrice: searchMaxValue}))
        },[dispatch]
    );*/
    useEffect(()=> {
        if (getBooksStatus ==='initial')
            dispatch(getBooksAction());
    },[getBooksStatus,dispatch])
    useEffect(()=>{
        if (getBooksPriceRangeStatus ==='initial')
            dispatch(getBooksPriceRangeAction());
    },[getBooksPriceRangeStatus,dispatch])

    useEffect(()=>() => {dispatch(resetBooksState());dispatch(resetOrderState)}, [dispatch]);
    return (
        <div className="container">
            <InputField value = {searchValue} setValue={setSearchValue} loading={isLoading} onSubmit={handleSearch} buttonTitle="Найти"/>
            <MinMaxInput minvalue={searchMinValue} setMinValue={setSearchMinValue} maxValue={searchMaxValue} setMaxValue={setSearchMaxValue} loading={isLoading} minplaceholder={booksPriceRange.min_pr +' руб.'} maxplaceholder={booksPriceRange.max_pr + ' руб.'} onSubmit={handleSearchMinMax}/>
            <Container className="book-list">
                <Row xs={4} md={4} className="g-4">
                    {Array.from(books)?.map((item, index) => {
                        return (
                            <Col key={index}>
                                <BookCard {...item}/>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default CatalogPage;


