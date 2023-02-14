import {Button} from "react-bootstrap";
import React, {useCallback} from "react";
import './MinMaxInput.css';

const MinMaxInput = ({ minValue, setMinValue, maxValue, setMaxValue, onSubmit, loading, minplaceholder, maxplaceholder, buttonTitle = 'Поиск'}) => {
    const minVal = useCallback((event)=>{ setMinValue(event.target.value)},[]);
    const maxVal = useCallback((event)=>{ setMaxValue(event.target.value)},[]);

    return <div className="MinMaxInput">
        <input value={minValue} placeholder={minplaceholder} onChange={minVal}/>
        <input value={maxValue} placeholder={maxplaceholder} onChange={maxVal}/>
        <Button disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
    </div>
}

export default MinMaxInput