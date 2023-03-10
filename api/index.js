/*const options = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": document.cookie
                    .split('; ')
                    .filter(row => row.startsWith('csrftoken='))
                    .map(c => c.split('=')[1])[0]
        },
        body: JSON.stringify({
                order_statusid: 8,
                order_date: new Date().toISOString()
        })
};
fetch(`http://${api_socket}/orders/${user_cart[user_cart.length - 1].order_id}/`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
*/

import axios from "axios";
axios.defaults.headers.common['x-csrftoken'] = document.cookie.split('; ')
                                                .filter(row => row.startsWith('csrftoken='))
                                                .map(c => c.split('=')[1])[0];
axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;
export const api = axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        withCredentials:true
});


export const getApiRequest = (link,body) =>
    api.get(link,body)
        .then((res)=>res.data)
        .catch((err) => { throw JSON.stringify(err.response?.data);
        })

export const postApiRequest = (link,body) =>
    api.post(link,body)
        .then((res)=>res.data)
        .catch((err) => { throw JSON.stringify(err.response?.data);
        })

export const deleteApiRequest = (link,body) =>
    api.delete(link,body)
        .then((res)=>res.data)
        .catch((err) => {throw JSON.stringify(err.response?.data);
        })

export const patchApiRequest = (link, body)=>
    api.patch(link, body)
        .then((res)=>res.data)
        .catch((err)=>{
                throw JSON.stringify(err.response?.data);
        })