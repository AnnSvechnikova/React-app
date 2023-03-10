//запросы к бэкенду (заказы)
import {deleteApiRequest, getApiRequest, patchApiRequest, postApiRequest} from "../index";

export const OrderStatus =Object.freeze({
    CREATED: 'CREATED',
    CANCELLED:'CANCELLED',
    DELIVERED:'DELIVERED',
    PAID:'PAID'
});

export const getOrders = async (params)=>{
    return await getApiRequest('/orders/', {
        params:{
            user_id:params?.user_id,
            status: params?.status
        }
    } )
}

export const postOrder = async (params)=>{
    return await postApiRequest('/orders/', params);
}

export const deleteOrder = async (id)=>{
    return await deleteApiRequest(`/orders/${id}/` )
}

export const getBookInfo = async (params)=>{
    return await getApiRequest(`/orders/get_book_info/`, {
        params:{
            id:params?.id
        }
    })
}

export const patchOrder = async (params) =>{
    const {id, ...other_params} = params;
    return await patchApiRequest(`/orders/${id}/`, other_params);
}