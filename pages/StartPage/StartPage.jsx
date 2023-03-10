import React from "react";
import './StartPage.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Redirect} from "react-router";
import "./StartPage.css"

function StartPage() {
    const {isAuthorized, user} = useSelector((store)=>store.userReducer)
    if (isAuthorized && user.is_staff)
        return (
            <div className="options">
                <p>Добро пожаловать в интерфейс менеджера!</p>
                <Link to="/addbook" className="link">-Добавить книги</Link>
                <Link to="/editorders" className="link">-Список заказов</Link>
            </div>
        );
    return <Redirect to="/books" />;

}
export default StartPage;