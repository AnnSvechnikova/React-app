import React, {useCallback} from 'react';
import {NavLink} from "react-router-dom";
import './Navigation.css';
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../../store/actions/users";

const Navigation = () => {
    const dispatch = useDispatch();
    const { isAuthorized,user } = useSelector((store) => store.userReducer);
    const handleLogout = useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);
    return (
        <nav className='nav'>
            <div className='nav__wrapper'>
                <div className='nav__links'>
                    <NavLink to='/books' className='nav__link'>Каталог</NavLink>
                    <NavLink to='/orders' className='nav__link'>Заказы</NavLink>
                    {isAuthorized? (
                        <NavLink onClick={handleLogout}
                            to='/books' className='nav__link'>Выйти</NavLink>
                    ) : (
                        <NavLink to='/auth' className='nav__link'>Войти</NavLink>
                    )}
                </div>
                <div className='nav__cart'>
                    {(user && isAuthorized && user.is_staff)? (
                        <NavLink to='/' className='nav__link nav__link--card'>Меню</NavLink>
                    ):(
                        <NavLink to='/cart' className='nav__link nav__link--card'>Корзина</NavLink>
                        )}
                </div>
                <div className='nav__mobile-wrapper'
                     onClick={(event) => event.currentTarget.classList.toggle('active')}>
                    <div className='nav__mobile-target' />
                    <div className='nav__mobile-menu'
                         onClick={(event) => event.stopPropagation()}>
                        <NavLink to='/books' className='nav__link'>Каталог</NavLink>
                        <NavLink to='/orders' className='nav__link'>Заказы</NavLink>
                        {isAuthorized? (
                            <NavLink onClick={handleLogout}
                                     to='/books' className='nav__link'>Выйти</NavLink>
                        ) : (
                            <NavLink to='/auth' className='nav__link'>Войти</NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;