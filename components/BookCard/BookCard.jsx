import {Card} from "react-bootstrap";
import React,  {useCallback, useContext, useEffect, useState} from "react";
import './BookCard.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersAction, postOrderAction} from "../../store/actions/orders";

function setDate(d) {
    return [
        d.getFullYear(),
        (d.getMonth() + 1).toString().padStart(2, '0'),
        d.getDate().toString().padStart(2, '0')
    ].join('-');
}

function addDays(d, n) {
    d.setDate(d.getDate() + n);
    return d;
}

const BookCard = ({book_id, title, in_stock, price, picture}) => {
    const {orders,postOrderStatus, getOrdersStatus}=useSelector((store)=>store.ordersReducer)
    const { isAuthorized } = useSelector((store) => store.authReducer);
    const [isChosen, setChosen]=useState(false);
    const dispatch=useDispatch();
    useEffect(()=>{
        if (getOrdersStatus==='initial')
            dispatch(getOrdersAction());
    },[getOrdersStatus, dispatch])
    useEffect(()=>{
        if (Array.from(orders).find(e => e.book_id === book_id))
            setChosen(true);
        //если есть заказ с таким id книги, то ставим true
    })
    const makeOrder = useCallback(()=>{
        setChosen(true);
        let d = new Date();
        dispatch(postOrderAction({
            user_id:1,
            book_id:book_id,
            amount:1,
            order_date:setDate(d),
            pay_date:setDate(addDays(d, 2)),
            deliv_date:setDate(addDays(d, 2)),
            state: 'создан'
        }))
    },[postOrderStatus,dispatch]);

    return <Card className="card">
        <Card.Body className="cardBody">
            <Card.Img className="cardImage" src={picture}/>
            <div className="book">
                <Link to={`/books/${book_id}/`} className= "link">{title}</Link>
            </div>
            <div  className="book">
                <Card.Text className="book">
                    {price} руб.
                    <button className="cardButton"  onClick={makeOrder} disabled={(!in_stock)||(!isAuthorized)||(isChosen)}>+</button>
                    {in_stock === 0 && <p className="notInStock">Нет в наличии</p>}
                </Card.Text>
            </div>
        </Card.Body>
        </Card>

}



export default BookCard;