import React, {useState, useEffect} from "react"
import Layout from "./Layout";
import {getProducts, getBraintreeClientToken, processPayment, createOrder} from "./apiCore";
import {getCart, emptyCart} from "./cartHelpers";
import {Link} from "react-router-dom";
import Card from "./Card";
import {isAuthenticated} from '../auth';
import 'braintree-web';
import DropIn from 'braintree-web-drop-in-react';


const Checkout = ({products, setRun = f => f , run=undefined}) => {

    const [data, setData] = useState({
        loading:false,
        success:false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    // Se obtienen los datos del usuario como son el userId y el token del usuario admin que se genera en el login
const userId = isAuthenticated() && isAuthenticated().user._id;
const token = isAuthenticated() && isAuthenticated().token;

const getToken = (userId, token) => {
    //
    getBraintreeClientToken(userId, token).then(data => {
        if(data.error) {
            setData({...data, error: data.error})
         } else {
             setData ({clientToken: data.clientToken})
         }
    })
}

useEffect(() => {
    getToken(userId, token)
} , [])



const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    }

    const showCheckout = () => {

        return isAuthenticated() ? (

            <div>{showDropIn()}</div>
            )
         : 
        (
            <Link to ="/signin">
            <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    let deliveryAddress = data.address

    const buy = () => {
        // send the nonce to your server 
        // nonce = data.instance.requestPaymentMethod()
        setData ({loading: true})
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            console.log(data)
            nonce = data.nonce;
            // once you cave the nonce(card type, card number, etc) send nonce as 'paymentMethodNonce' to the backend
            // and also total to be charged
            console.log('send nonce and total to process:', nonce , getTotal(products))

            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            };

            processPayment(userId, token, paymentData)
            .then(response => {

                 // create order
                console.log('respuesta de processPayment')
                console.log(response)
                 const createOrderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAddress
                }
                console.log('createOrderData')
                console.log(createOrderData)

                createOrder(userId,token, createOrderData)

                setData({...data, success: response.success});
               
                // empty cart
               
                emptyCart(() => {
                    setRun(!run);
                    console.log("payment success and empty cart");
                setData({ loading: false,
                success: true});
                });

                
                // console.log(response)
                // console.log(response.success)
            })
            
            .catch(error => {
                console.log(error);
            setData({loading: false});


        })

    })
        .catch(error => {
            console.log('dropin error: ',error)
            setData({...data, error: error.message})
        });
    };
    
const handleAddress = event => {
   // console.log(event.target.value)
    setData({...data, address: event.target.value})
}

const showDropIn = () => (
  
  <div onBlur = {() => setData({...data, error: ""})}>
  
  
        {data.clientToken !== null && products.length > 0 ? (
                            <div>
        <div className="form-group mb-3">
        <label className="text-muted">Delivery address</label>
        <textarea 
        onChange= {handleAddress}
        className="form-control"
        value={data.address}
        placeholder="Type your delivery address here..."
        />
        </div>


            <DropIn options= {{
                authorization: data.clientToken,
                paypal: {
                    flow: "vault"
                }
                }} onInstance= {instance => (data.instance = instance)} />

                <button onClick = {buy} className="btn btn-success btn-block">Buy</button>

            </div>
        ) : null}
    </div>
);

// const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

const showError = error => (
    <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
        {error}
    </div>
);



const showSuccess = success => (
    <div className="alert alert-info" style={{display: success ? '': 'none'}}>
        Thanks! Your payment was processed!
    </div>
);


const showLoading = loading => (loading && <h2>Loading...</h2>)


return (

<div>
        <h2>Total: ${getTotal()}</h2>

    {showLoading(data.loading)} 
    {showSuccess(data.success)}

 
    {showError(data.error)}
     {showCheckout()}        
    </div>

);
};

export default Checkout;
