import {Card} from "react-bootstrap";
import React,  {useCallback, useContext, useEffect, useState} from "react";
import './BookCard.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersAction, postOrderAction} from "../../store/actions/orders";
import {OrderStates} from "../../api/services/orders";

export function setDate(d) {
    return [
        d.getFullYear(),
        (d.getMonth() + 1).toString().padStart(2, '0'),
        d.getDate().toString().padStart(2, '0')
    ].join('-');
}

export function addDays(d, n) {
    d.setDate(d.getDate() + n);
    return d;
}

const BookCard = ({book_id, title, in_stock, price, picture}) => {
    const {orders,postOrderStatus, getOrdersStatus}=useSelector((store)=>store.ordersReducer)
    const {user, isAuthorized } = useSelector((store) => store.userReducer);
    const [isChosen, setChosen]=useState(false);
    const dispatch=useDispatch();
    useEffect(()=>{
        if (Array.from(orders).find(e => (e.book_id === book_id)&&(e.state === 'CREATED')))
            setChosen(true);
        //если есть заказ с таким id книги, то ставим true
    },[postOrderStatus, getOrdersStatus]);
    const makeOrder = useCallback(()=>{
        setChosen(true);
        let d = new Date();
        dispatch(postOrderAction({
            user_id:user.user_id,
            book_id:book_id,
            amount:1,
            order_date:setDate(d),
            //pay_date:setDate(addDays(d, 2)),
            deliv_date:setDate(addDays(d, 2)),
            state: OrderStates.CREATED
        }))
    },[postOrderStatus,dispatch]);
    //console.log(book_id);
    return (<Card className="card">
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
    )
}

export default BookCard;