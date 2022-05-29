import {API} from "../config"


export const createCategory = (userId, token, category) => {
    //console.log(name, email, password)
   return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
        Authorization: `Bearer ${token}` },
     body: JSON.stringify(category)       
        
    })
 .then(response => {
     return response.json()
 
 })
 .catch(err => {console.log(err)})
 }


 export const createProduct = (userId, token, product) => {
    //console.log(name, email, password)
   return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "content-Type": "application/json",
        Authorization: `Bearer ${token}` },
     body: product    
        
    })
 .then(response => {
     return response.json()
 
 })
 .catch(err => {console.log(err)})
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

 export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
           
        Authorization: `Bearer ${token}` },

    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}


export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
           
        Authorization: `Bearer ${token}` },

    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}


export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`},

        body: JSON.stringify({status,orderId})

    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}

/**
 *  to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

 export const getProducts = (sortBy) => {
    return fetch(`${API}/products?limit=15`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
};

// To delete a product we need to delete the productId, userId, and the token

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`},

    

    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
};


export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
};

// The parameter product means the changes that we need to send in order to update the product
export const updateProduct = (productId, userId, token, product) => {
    console.log(token)
    console.log(productId)
    console.log(userId)
    console.log(product)
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
        Accept: "application/json",
     //   "Content-Type": "application/json",
        Authorization: `Bearer ${token}`}
    ,
    
    body: product}) // product has to be form data, because the product has the image. So to upload image we need to use form data.
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
};