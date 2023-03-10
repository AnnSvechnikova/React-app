import React, { useCallback, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { validateRegistrationForm } from './utils';
import { registrationAction } from '../../store/actions/users';
import './RegistrationPage.css';
import {Redirect} from "react-router";

export const RegistrationPage= () => {

    const dispatch = useDispatch();
    const [registration, setRegistration] = useState(false);
    const onSubmit = useCallback(
        (values) => {
            dispatch(registrationAction(values));
            setRegistration(true);
        },
        [dispatch],
    );

    if (registration) {
        return <Redirect to="/auth" />;
    }
    return (
        <div className="block">
            <div className='title'>Регистрация</div>
            <Form onSubmit={onSubmit} validate={validateRegistrationForm} >
                {({ handleSubmit}) => (
                    <form onSubmit={handleSubmit} className='form'>
                        <Field name="username">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    type="username"
                                    placeholder="имя пользователя"
                                    className='input'
                                />
                            )}
                        </Field>
                        <Field name="password">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    type="password"
                                    placeholder="пароль"
                                    className='input'
                                />
                            )}
                        </Field>
                        <Field name="full_name">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    placeholder="имя и фамилия"
                                    type="text"
                                    className='input'
                                />
                            )}
                        </Field>
                        <button className='button' type="submit">
                            Сохранить
                        </button>
                    </form>
                )}
            </Form>
        </div>

    );

};
export default RegistrationPage;