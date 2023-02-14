//запросы к бэкенду (заказы)
import {deleteApiRequest, getApiRequest, postApiRequest} from "../index";

export const getOrders = async ()=>{
    return await getApiRequest('/orders/' )
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
