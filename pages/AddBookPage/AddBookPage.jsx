import React, { useCallback, useState } from 'react';
import { Field, Form } from 'react-final-form';
import {useDispatch, useSelector} from 'react-redux';
import {postBookAction} from "../../store/actions/books";
import "./AddBookPage.css";

const AddBookPage = () => {
    const dispatch = useDispatch();
    const{books, postBookStatus, getBooksStatus}=useSelector((store) =>store.booksReducer);
    const onSubmit = useCallback(
        (values) => {
            dispatch(postBookAction(values));
        },
        [dispatch, postBookStatus],
    );
    return (
        <div className="block">
            <div className='title'>Добавление книги</div>
            <Form onSubmit={onSubmit}>
                {({ handleSubmit}) => (
                    <form onSubmit={handleSubmit} className='form'>
                        <Field name="title">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    placeholder="название"
                                    className='input'
                                />
                            )}
                        </Field>
                        <Field name="in_stock">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    type="number"
                                    placeholder="в наличии"
                                    className='input'
                                />
                            )}
                        </Field>
                        <Field name="descr">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    placeholder="описание"
                                    className='input'
                                />
                            )}
                        </Field>
                        <Field name="price">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    type="number"
                                    placeholder="цена"
                                    className='input'
                                />
                            )}
                        </Field>
                        <Field name="picture">
                            {({ input, meta }) => (
                                <input
                                    {...input}
                                    placeholder="ссылка на обложку"
                                    className='input'
                                />
                            )}
                        </Field>
                        <button className='button' type="submit">Сохранить</button>
                    </form>
                )}
            </Form>
        </div>

    );
}

export default AddBookPage