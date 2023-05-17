//запросы к бэкенду (заказы)
import {deleteApiRequest, getApiRequest, patchApiRequest, postApiRequest} from "../index";

export const OrderStates =Object.freeze({
    CREATED: 'CREATED',
    CANCELLED:'CANCELLED',
    DELIVERED:'DELIVERED',
    PAID:'PAID'
});

export const getOrderStates = async (params)=>{
    return await getApiRequest(`/orders/order_states/`, params)
}

export const getOrders = async (params)=>{
    return await getApiRequest('/orders/', {
        params:{
            user_id:params?.user_id,
            state: params?.state,
            date_type: params?.date_type,
            minDate:params?.minDate,
            maxDate:params?.maxDate
        }
    } )
}

export const postOrder = async (params)=>{
    return await postApiRequest('/orders/', params);
}

export const deleteOrder = async (id)=>{
    return await deleteApiRequest(`/orders/${id}/` )
}

export const getOrderById = async(id)=>{
    return await getApiRequest(`/orders/${id}/`)
}

export const getBookInfo = async (params)=>{
    return await getApiRequest(`/orders/get_book_info/`, {
        params:{
            id:params?.id
        }
    })
}

export const patchOrder = async (params) =>{
    const {order_id, ...other_params} = params;
    return await patchApiRequest(`/orders/${order_id}/`, other_params);
}