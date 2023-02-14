//запросы к бэкенду (книги)
import {getApiRequest} from "../index";

export const getBooks = async (params)=>{
    return await getApiRequest('/books/',{
        params:{
            minPrice:params?.minPrice,
            maxPrice:params?.maxPrice
        }
    })
}

export const getBookById = async (id) =>{
    return await getApiRequest(`/books/${id}/`)
}

export const getBookByName = async (name) =>{
    return await getApiRequest(`/books/?search=${name}`)
}

export const getBooksPriceRange = async (params)=>{
    return await getApiRequest('/books/get_price_range/', {params:{}})
}