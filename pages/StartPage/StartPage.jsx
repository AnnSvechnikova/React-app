import React, {useContext, useEffect, useReducer, useState} from 'react';
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import BookCard from "../../components/BookCard/BookCard";
import './StartPage.css';
import {Link} from "react-router-dom";
import {Context} from "../../Context";


function loadingReducer(state, action){
    switch (action.type){
        case 'loading':
            return true;
    }
}
function itemsReducer(state, action){
    switch (action.type){
        case 'loaded':
            return action.payload;
    }
}

function StartPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useReducer(loadingReducer,{loading: false});
    const [items, dispatchItems] = useReducer(itemsReducer,[]);
    const [context, setContext]=useContext(Context);
    useEffect(()=> {
        fetch("http://127.0.0.1:8000/books/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded({type: 'loading'});
                    dispatchItems({type:'loaded', payload: result});
                    setContext(result);
                },
                (error) => {
                    setIsLoaded({type: 'loading'});
                    setError(error);
                }
            )
    },[])
    if (error) {
        return <div>Ошибка загрузки: {error.message}</div>;
    } else if (!isLoaded){
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item className="crumb">
                        <Link to={`/books/`} className= "cr-link">Каталог книг </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="container">
                    <Container className="book-list">
                        <Row xs={4} md={4} className="g-4">
                         {items.map((item, index) => {
                               return (
                                    <Col key={index}>
                                      <BookCard {...item}/>
                                    </Col>
                               )
                            })}
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default StartPage;