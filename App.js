import {BrowserRouter, Route, Link, Switch, useParams} from "react-router-dom";
import BookPage from "./pages/BookPage/BookPage";
import StartPage from "./pages/StartPage/StartPage";
import './App.css';
import {Context} from "./Context";
import React, {useCallback, useState} from "react";
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import CartPage from "./pages/CartPage";
import {changeAuthorizedState} from "./store/reducers/auth";
import {useDispatch, useSelector} from "react-redux";

const App = () =>{
    const { isAuthorized } = useSelector((store) => store.authReducer);
    const dispatch = useDispatch();
    const handleChangeAuthState = useCallback(() => {
        dispatch(changeAuthorizedState());
    }, [dispatch]);
    return (
        <BrowserRouter basename="/"  >
            <div className='wrap'>
                <Link to="/orders" className="cart" ><img className="logocart" src={'https://img.icons8.com/ios-glyphs/512/shopping-cart.png'} alt="cart" /></Link>
                <Button onClick={handleChangeAuthState} className="auth" ><img className="logoauth" src={'https://img.icons8.com/ios-glyphs/512/user.png'} alt="auth" /></Button>
            </div>
            <Switch>
                <Route exact path="/">
                    <StartPage/>
                </Route>
                <Route path="/books" exact={true}>
                    <StartPage/>
                </Route>
                <Route path="/books/:id">
                    <BookPage/>
                </Route>
                <Route path="/orders">
                    <CartPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
