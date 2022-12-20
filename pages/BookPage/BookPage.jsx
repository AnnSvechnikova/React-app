import React, {useContext} from 'react';
import './BookPage.css';
import BookCard from "../../components/BookCard/BookCard";
import {Link, useParams} from "react-router-dom";
import {Context} from "../../Context";
import Breadcrumb from "react-bootstrap/Breadcrumb";
const BookPage = () => {
    //let {book_id} = useParams();
    const params = useParams();
    let book_id = params.id;
    console.log({book_id});
    const [context, setContext] = useContext(Context);
    console.log(context);
    const Book = context.find((b)=>Number(b.book_id)===Number(book_id));
    console.log(Book)
    return (
        <div className="book-page">
            <Breadcrumb>
                <Breadcrumb.Item className="crumb">
                    <Link to={`/books/`} className= "cr-link">Каталог книг/ </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item className="crumb">
                    <Link to={`/books/${Book.book_id}`} className= "cr-link">{Book.title}</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
           <img className="bookImage" src={Book.picture}/>
           <div className="bookText">
               <p>{Book.descr}</p>
               <p>Стоимость: {Book.price} руб.</p>
               {Book.in_stock === 0 && <p>Книга не в наличии!</p>}
           </div>
        </div>
    )
};

export default BookPage;