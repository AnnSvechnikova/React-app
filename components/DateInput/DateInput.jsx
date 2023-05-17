import {Button} from "react-bootstrap";
import React, {useCallback} from "react";
import './DateInput.css';

const DateInput = ({ minValue, setMinValue, maxValue, setMaxValue, onSubmit, loading, buttonTitle = 'Поиск'}) => {
    const minVal = useCallback((event)=>{ setMinValue(event.target.value)},[]);
    const maxVal = useCallback((event)=>{ setMaxValue(event.target.value)},[]);

    return <div className="DateInput">
        <input type="date" value={minValue}  onChange={minVal}/>
        <input type="date" value={maxValue}  onChange={maxVal}/>
        <Button disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
    </div>
}

export default DateInput