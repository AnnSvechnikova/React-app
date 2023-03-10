import React, {useContext, useEffect} from 'react';
import './BookPage.css';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteBookAction, getBookByIdAction, patchBookAction,} from "../../store/actions/books";
import {useCallback} from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Container, Nav, Navbar} from "react-bootstrap";
import { Field, Form } from 'react-final-form';
import {Loader} from "../../components/Loader";

const BookPage = () => {
    let {id} = useParams()
    const dispatch = useDispatch();
    //console.log({book_id});
    const{books, getBookByIdStatus, patchBookStatus, deleteBookStatus}=useSelector((store) =>store.booksReducer)
    const{user}=useSelector((store)=>store.userReducer);
    useEffect(()=>{
        if (getBookByIdStatus==='initial') {
            dispatch(getBookByIdAction(id));
            console.log(books.title);
        }
    },[getBookByIdStatus,dispatch]);

    const deleteBook=useCallback(()=>{
        dispatch(deleteBookAction(books.book_id));
    },[deleteBookStatus,dispatch])

    const patchBook = useCallback(
        (values) => {
            dispatch(patchBookAction({
                book_id: Number(books.book_id),
                title: values?.title ?? books.title,
                in_stock: values.in_stock ?? books.in_stock,
                descr: values.descr ?? books.descr,
                price: values.price ?? books.price,
                picture: values.picture ?? books.picture,
            }));
        },
        [dispatch, patchBookStatus],
    );
    if (user && user.is_staff)
        return(
            <div className="block">
                <Loader/>
                <Form onSubmit={patchBook}>
                    {({ handleSubmit}) => (
                        <form onSubmit={handleSubmit} className='form'>
                            <Field name="id">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder={books.book_id}
                                        className='input'
                                        type='number'
                                        defaultValue={books.book_id}
                                    />
                                )}
                            </Field>
                            <Field name="title">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder={books.title}
                                        className='input'
                                        defaultValue={books.title}
                                    />
                                )}
                            </Field>
                            <Field name="in_stock">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        type='number'
                                        className='input'
                                        placeholder={books.in_stock}
                                        defaultValue={books.in_stock}
                                    />
                                )}
                            </Field>
                            <Field name="descr">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder={books.descr}
                                        className='input'
                                        defaultValue={books.descr}
                                    />
                                )}
                            </Field>
                            <Field name="price">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder={books.price}
                                        type='number'
                                        className='input'
                                        defaultValue={books.price}
                                    />
                                )}
                            </Field>
                            <Field name="picture">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder='url обложки'
                                        className='input'
                                        defaultValue={books.picture}
                                    />
                                )}
                            </Field>
                            <button className='button' type="submit">
                                Сохранить
                            </button>
                        </form>
                    )}
                </Form>
                <button className="delButton"  onClick={deleteBook}>удалить книгу</button>
            </div>
        )
    return (
        <div className="book-page">
            <Loader/>
            <img className="bookImage" src={books.picture}/>
            <div className="bookText">
                <p>{books.descr}</p>
                <p>Стоимость: {books.price} руб.</p>
                {books.in_stock === 0 && <p className="notInStock">Временно не в наличии</p>}
            </div>
        </div>
    )
};

export default BookPage;

/*import React, {useContext, useEffect} from 'react';
import './BookPage.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteBookAction, getBookByIdAction, patchBookAction,} from "../../store/actions/books";
import {useCallback} from "react";
import { Field, Form } from 'react-final-form';

const BookPage = () => {
    let {book_id} = useParams();
    console.log({book_id});
    const{books, getBookByIdStatus, patchBookStatus, deleteBookStatus}=useSelector((store) =>store.booksReducer);
    const{user}=useSelector((store)=>store.userReducer);
    console.log(books);
    const dispatch = useDispatch();
    useEffect(()=>{
        if (getBookByIdStatus==='initial') {
            dispatch(getBookByIdAction(book_id));
            console.log(books.title);
        }
    },[getBookByIdStatus,dispatch]);

    const deleteBook=useCallback(()=>{
        dispatch(deleteBookAction(book_id));
    },[deleteBookStatus,dispatch])

    const patchBook = useCallback(
        (values) => {
            dispatch(patchBookAction({
                book_id: Number(books.book_id),
                title: values?.title ?? books.title,
                in_stock: values.in_stock ?? books.in_stock,
                descr: values.descr ?? books.descr,
                price: values.price ?? books.price,
                picture: values.price ?? books.price,
            }));
        },
        [dispatch, patchBookStatus],
    );
    if (user && user.is_staff)
        return(
            <div className="block">
                <Form onSubmit={patchBook}>
                    {({ handleSubmit}) => (
                        <form onSubmit={handleSubmit} className='form'>
                            <Field name="id">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder={books.book_id}
                                        className='input'
                                        type="number"
                                        defaultValue={books.book_id}
                                    />
                                )}
                            </Field>
                            <Field name="title">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder={books.title}
                                        className='input'
                                        defaultValue={books.title}
                                    />
                                )}
                            </Field>
                            <Field name="in_stock">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        type="number"
                                        className='input'
                                        placeholder={books.in_stock}
                                        defaultValue={books.in_stock}
                                    />
                                )}
                            </Field>
                            <Field name="descr">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder={books.descr}
                                        className='input'
                                        defaultValue={books.descr}
                                    />
                                )}
                            </Field>
                            <Field name="price">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder={books.price}
                                        type="number"
                                        className='input'
                                        defaultValue={books.price}
                                    />
                                )}
                            </Field>
                            <Field name="picture">
                                {({ input, meta }) => (
                                    <input
                                        {...input}
                                        placeholder="url обложки"
                                        className='input'
                                        defaultValue={books.picture}
                                    />
                                )}
                            </Field>
                            <button className='button' type="submit">
                                Сохранить
                            </button>
                        </form>
                    )}
                </Form>
                <button className="delButton"  onClick={deleteBook}>удалить книгу</button>
            </div>
        )
    return (
                    <div className="book-page">
                        <img className="bookImage" src={books.picture}/>
                        <div className="bookText">
                            <p>{books.descr}</p>
                            <p>Стоимость: {books.price} руб.</p>
                            {books.in_stock === 0 && <p className="notInStock">Временно не в наличии</p>}
                            {books.in_stock !== 0 && <p>Доступно {books.in_stock} шт.</p>}
                        </div>
                    </div>
        )
};

export default BookPage;*/

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
