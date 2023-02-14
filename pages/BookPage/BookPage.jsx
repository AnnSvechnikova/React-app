import React, {useContext, useEffect} from 'react';
import './BookPage.css';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getBookByIdAction} from "../../store/actions/books";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Container, Nav, Navbar} from "react-bootstrap";

const BookPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    let book_id = params.id;
    //console.log({book_id});
    const{books, getBookByIdStatus}=useSelector((store) =>store.booksReducer)
    useEffect(()=>{
        if (getBookByIdStatus==='initial') {
            dispatch(getBookByIdAction(book_id));
            console.log(books.title);
        }
    },[getBookByIdStatus,dispatch]);
        return (
                    <div className="book-page">
                        <Navbar bg="light" expand="lg">
                            <Container className="navigation">
                                <Nav.Link className="nlink" href="/">Главная страница</Nav.Link>
                                <Nav.Link className="nlink">{books.title}</Nav.Link>
                            </Container>
                        </Navbar>

                        <img className="bookImage" src={books.picture}/>
                        <div className="bookText">
                            <p>{books.descr}</p>
                            <p>Стоимость: {books.price} руб.</p>
                            {books.in_stock === 0 && <p className="notInStock">Временно не в наличии</p>}
                        </div>
                    </div>
        )
};

export default BookPage;
