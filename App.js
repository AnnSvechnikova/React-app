import {BrowserRouter, Route, Link, Switch, useParams} from "react-router-dom";
import BookPage from "./pages/BookPage/BookPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import StartPage from "./pages/StartPage/StartPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import './App.css';
import {Context} from "./Context";
import React, {useCallback, useState} from "react";
import CartPage from "./pages/CartPage";
import {changeAuthorizedState} from "./store/reducers/auth";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "./store/actions/users";
import Navigation from "./components/Navigation";
import AddBookPage from "./pages/AddBookPage";
import EditOrdersPage from "./pages/EditOrdersPage";


const App = () =>{
    const { isAuthorized,user } = useSelector((store) => store.userReducer);
    const dispatch = useDispatch();
    const handleLogout = useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);
    return (
        <BrowserRouter basename="/"  >
            <Navigation/>
            <Switch>
                <Route exact path="/">
                    <StartPage/>
                </Route>
                <Route path="/books" exact={true}>
                    <CatalogPage/>
                </Route>
                <Route path="/books/:id">
                    <BookPage/>
                </Route>
                <Route path="/orders">
                    {isAuthorized ? <CartPage/> :<LoginPage/>}
                </Route>
                <Route path="/auth"> <LoginPage/> </Route>
                <Route path="/registration"><RegistrationPage/></Route>
                <Route path="/addbook"><AddBookPage/></Route>
                <Route path="/editorders"><EditOrdersPage/></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
/*<Link to="/orders" className="cart" ><img className="logocart" src={'https://img.icons8.com/ios-glyphs/512/shopping-cart.png'} alt="cart" /></Link>
            {isAuthorized ? (
                <button onClick={handleLogout} className="exit">
                    <img className="logoauth" src={'https://img.icons8.com/ios-glyphs/512/exit.png'} alt='auth'/>
                </button>
            ) : (
                <Link to="/auth" className="auth">
                    <img className="logoauth" src={'https://img.icons8.com/ios-glyphs/512/user.png'} alt="auth"/>
                </Link>
            )}*/