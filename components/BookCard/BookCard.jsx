import {Card} from "react-bootstrap";
import React from "react";
import './BookCard.css';
import {Link} from "react-router-dom";

const BookCard = ({book_id, title, in_stock, descr, price, picture} ) => {
    return <Card className="card">
        <Card.Body>
            <Card.Img className="cardImage" src={picture}/>
            <div className="book">
                <Link to={`/books/${book_id}`} className= "link">{title}</Link>
            </div>
            <div  className="book">
                <Card.Text className="book">
                    {price} руб.
                    {in_stock === 0 && <p className="notInStock">Нет в наличии</p>}
                </Card.Text>
            </div>
        </Card.Body>
    </Card>
}

export default BookCard;