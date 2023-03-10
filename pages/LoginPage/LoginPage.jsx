import React, { useCallback } from 'react';
import { Field, Form } from 'react-final-form';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import { loginAction } from '../../store/actions/users';
import './LoginPage.css';
import {Redirect} from "react-router";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { isAuthorized, user } = useSelector((store) => store.userReducer);
    //console.log(isAuthorized, user);
    const onSubmit = useCallback(
        (values) => {
            dispatch(loginAction(values));
        },
        [dispatch],
    );

    if (isAuthorized && user?.is_staff) {
        return <Redirect to="/" />; //Navigate
    }
    else if (isAuthorized && !user?.is_staff){
        return <Redirect to="/books" />;
    }

    return (
        <div className="block">
            <div className="authentication">Войдите в свой аккаунт</div>
            <Form onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="form">
                        <Field name="username">
                            {({ input }) => <input {...input} className="input" placeholder="Введите логин"/>}
                        </Field>
                        <Field name="password">
                            {({ input }) => <input {...input} className="input" placeholder="Введите пароль"/>}
                        </Field>
                        <button className="login" type="submit">
                            Войти
                        </button>
                    </form>
                )}
            </Form>
            <Link to="/registration" className="registration" type="button">
                Нет аккаунта? Зарегистрируйтесь!
            </Link>
        </div>
    );
};

export default LoginPage;