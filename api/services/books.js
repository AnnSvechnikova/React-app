//запросы к бэкенду (книги)
import {getApiRequest, postApiRequest, patchApiRequest, deleteApiRequest} from "../index";


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

export const postBook = async (params)=>{
    return await postApiRequest('/books/', params);
}

export const patchBookById = async (params)=>{
    const {book_id, ...param}=params;
    return await patchApiRequest(`/books/${book_id}/`, param);
}

export const deleteBook = async (id) => {
    return await deleteApiRequest(`/books/${id}/`)
}