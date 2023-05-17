import React, { useEffect, useState } from 'react';
import './Loader.css';
import {useSelector} from "react-redux";


export const Loader = ({ zIndex }) => {
    const { isLoading } = useSelector((store) => store.loaderReducer);
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        setIsShow(true);

        const setTimeoutId = setTimeout(() => {
            setIsShow(false);
        }, 2500);

        return () => {
            clearTimeout(setTimeoutId);
        };
    }, [isLoading]);

    if (isShow || isLoading) {
        return (
            <div className='loader' style={{ zIndex }}>
                <div className='loaderIcon'>
                    <img src='https://i.postimg.cc/mg8xbJfh/1663853209-26-phonoteka-org-p-znachok-zagruzki-bez-fona-instagram-53.png' alt='loading'></img>
                </div>
            </div>
        );
    }

    return null;
};