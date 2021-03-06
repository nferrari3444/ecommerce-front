import {API} from "../config"
import queryString from 'query-string'


export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const list = params => {
    console.log(params)
    const query = queryString.stringify(params)
    console.log('query', query)
    return fetch(`${API}/products/search?${query}`, { 
        // We need to create this method in the backend
        method: "GET"
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}


export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// This function is to show related products on the single product page
export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// Make request to the backend
export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    
    body: JSON.stringify(paymentData)
    
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}





export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// In the variable createOrderData is whatever data we need for the order: product name, quantity and so on.
export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    
    body: JSON.stringify({order:createOrderData})
    
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
};



export const getFilteredProducts = (skip, limit, filters = {}) => {
    //console.log(name, email, password)

    const data = {

        limit, skip, filters
    }

   return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
         },
     body: JSON.stringify(data)       
        
    })
 .then(response => {
     return response.json()
 
 })
 .catch(err => {console.log(err)})
 }