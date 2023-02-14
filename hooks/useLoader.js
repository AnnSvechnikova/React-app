import {loaded, loading} from "../store/reducers/loader";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

export const useLoader=(statuses =>{
    const dispatch = useDispatch();
    useEffect(() =>{
        const isFetching = statuses.some((status)=>status==='fetching');
        if (isFetching)
            dispatch (loading())
        else
            dispatch(loaded())
    }, [statuses,dispatch])
})