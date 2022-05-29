import {API} from "../config"


// We need to send the userId and token from the profile component in order to request to the backend
export const read = (userId, token) => {
    console.log(userId)
    console.log(token)
    return fetch(`${API}/user/${userId}`, {
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

// The parameter user is whatever data we want update about the user( we send this from the user component)
// Send from the profile as user
export const update = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    
    body: JSON.stringify(user)
    
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
};


// After we update the user information from the backend, we need to update the user information saved in the
// local storage, because we are saving the user information at local storage and from local storage, we are grabbing the 
// user information, from a different name and so on.

// Unless users sign out and sign in again, they will not see the changes. But if we updated the local storage as well, then
// even if they don't sign out and sign, they will inmediately see the changes(the updated data).

export const updateUser = (user, next) => {
    // The updated information is in the user parameter that comes from the Profile component
    if(typeof window!== 'undefined'){
        if(localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            // The jwt key has the token and the user property. Now we grabbed the user property,
            // and change that to the user, whatever we are getting from the profile component
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth))
            next() // This callback can do something like redirect the user or something else.
        }
    }
}


export const getPurchaseHistory = (userId, token) => {
    console.log(userId)
    console.log(token)
    return fetch(`${API}/orders/by/user/${userId}`, {
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