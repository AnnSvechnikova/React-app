import {Breadcrumb, Col, Container, Row, Button, Navbar, Nav} from "react-bootstrap";
import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import BookCard from "../../components/BookCard/BookCard";
import './StartPage.css';
import InputField from "../../components/InputField";
import {useDispatch, useSelector} from "react-redux";
import {getBookByNameAction, getBooksAction, getBooksPriceRangeAction} from "../../store/actions/books";
import {resetBooksState} from "../../store/reducers/books";
import MinMaxInput from "../../components/MinMaxInput/MinMaxInput";


const StartPage = () => {
    const{books, isLoading, getBooksStatus, getBooksPriceRangeStatus, booksPriceRange, getBookByNameStatus}=useSelector((store) =>store.booksReducer)
    const { isAuthorized } = useSelector((store) => store.authReducer);
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [searchMinValue, setSearchMinValue] = useState('');
    const [searchMaxValue, setSearchMaxValue] = useState('');

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

    useEffect(() => {dispatch(resetBooksState());}, [dispatch]);
    return (
        <div className="container">
            <Navbar bg="light" expand="lg">
                <Container className="navigation">
                    <Nav.Link className="nlink" href="/">Главная страница</Nav.Link>
                    <Nav.Link className="nlink" href="/orders">Корзина</Nav.Link>
                </Container>
            </Navbar>
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

export default StartPage;


