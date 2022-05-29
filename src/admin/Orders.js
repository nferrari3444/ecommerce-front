import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth';
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin';

import moment from 'moment';


// Componente Orders
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const {user, token} = isAuthenticated()
    console.log(user._id)
    
    // On successful response we have all the orders in the state
    const loadOrders = () => {
        listOrders(user._id, token).then(data=> {
            console.log(data)
            if(data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })

}

const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data=> {
        console.log(data)
        if(data.error) {
            console.log(data.error)
        } else {
            setStatusValues(data)
        }
    })

}

useEffect(()  => {
    loadOrders()
    loadStatusValues()
}, [])

const showOrdersLength = () => {

    if (orders.length >0) {
        return (
            <h1 className="text-danger display-2">
            Total Orders: {orders.length}
            </h1>
        );
    } else {
    return orders.length <1 ? <h4>No orders</h4> : null;
    }

};

const showInput = (key,value) =>(
    <div className="input-group mb-2 mr-sm-2">
        <div className='input-group-prepend'>
            <div className='input-group-text'>{key}</div>
        </div>
        <input type="text" value={value} className="form-control" readOnly/>
    </div>
)


// Make request to the backend so we can update the order status
const handleStatusChange = (e,orderId) => {
    console.log(e)
    console.log("update order status")
    // e.target.value es el status
    updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
        if (data.error) {
            console.log('Status update failed')
        }
        else {
            console.log('llega aca')
            loadOrders()
        }
    })
}
// Use the arrow function because we don't want to execute the function handleStatusChange here 
// In the select we have the onChange event handler and we execute the handleStatusChange method, and we need
// to pass the argument event and orderId. A la función handleStatusChange cuando le pasas el parámetro e, sin
// haberlo definido antes, da error, por eso antes del arrow function tenes que definir el e: (e).

const showStatus = (o) => (
<div className='form-group'>
{console.log(o.status)}
    <h3 className='mark mb-4'>Status:{o.status}</h3>
    
    <select className='form-control' onChange={(e) => handleStatusChange(e, o._id)}>

        <option>Update Status</option>
        {statusValues.map((status,index) => (<option key={index} value={status}>{status}</option>))}
    </select>
</div>
)


    return(
    <Layout title="Orders" description={`Good day ${user.name}, you can manage all the orders here`}>
    
       
    <div className='row'>
<div className='col-md-8 offset-md-2'>

 {showOrdersLength()}
 {orders.map((o, oIndex) => {
     console.log(o)
     return (
    
         // Each order will have the border bottom, of 5 pixel solid indigo, so they look separated
         <div className="mt-5" key={oIndex} style={{borderBottom: '5px solid indigo'}}>
         <h2 className='mb-5'>
             <span className= "bg-primary">Order ID: {o._id}</span>
         </h2>

         <ul className='list-group mb-2'>
             <li className="list-group-item">
                 {showStatus(o)}
             </li>
             <li className='list-group-item'>
                 Transaction ID: {o.transaction_id}
             </li>
             
             <li className='list-group-item'>
                 Amount: ${o.amount}
             </li>

             {/* <li className='list-group-item'>
                 Ordered by: ${o.user.name}
             </li> */}

             <li className='list-group-item'>
                 Ordered on: {moment(o.createdAt).fromNow()}
             </li>

             <li className='list-group-item'>
                 Delivery address: {o.address}
             </li>

         </ul>

         <h3 className="mt-4 mb-4 font-italic">
             Total products in the order: {o.products.length}
         </h3>

             {o.products.map((p, pIndex) => (
                 <div className="mb-4" key={pIndex} style= {{padding: '20px', border: '1px solid indigo'}}> 
                    {showInput('Product name', p.name)}
                    {showInput('Product price', p.price)}
                    {showInput('Product total', p.count)}
                    {showInput('Product Id', p._id)}

                 </div>
             ))}
         </div>

     );
 })}

</div>
    </div>
    </Layout>
);
};



export default Orders;