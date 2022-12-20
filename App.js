import {BrowserRouter, Route, Link, Switch, useParams} from "react-router-dom";
import BookPage from "./pages/BookPage/BookPage";
import StartPage from "./pages/StartPage/StartPage";
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import {useState} from "react";
import {Context} from "./Context";
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";

import React from "react";

function App() {
    const [context, setContext] = useState(["default"])
    return (
        <Context.Provider value={[context, setContext]}>
            <BrowserRouter basename="/"  >
                <Link to="/purchases" className=""> </Link>
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
                </Switch>
            </BrowserRouter>
        </Context.Provider>

    );
}

export default App;