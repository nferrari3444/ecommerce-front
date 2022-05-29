import React, {useState, useEffect} from "react"
import Layout from "./Layout";
import {getCart, removeItem} from "./cartHelpers"
import {Link} from "react-router-dom"
import Card from "./Card"
import Checkout from "./Checkout"


const Cart = () => {
    // We will get the items from the Local Storage and populate in the state.
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false);
  
    useEffect(() => {
        setItems(getCart())
        // console.log(items)

    }, [run]) // antes estaba items y el estado de run no estaba definido

    const showItems = items => {
        return ( 
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr/>
                {items.map((product, i) => (<Card key={i} 
                product={product} 
                showAddToCartButton={false}
                cartUpdate= {true} 
                showRemoveProductButton={true} 
                setRun = {setRun}
                run = {run} />
                ) )}
            </div>
        )
    }

    const noItemMessage = () => (
        <h2>Your cart is empty. <br/> <Link to="/shop">Continue shopping</Link></h2>
    )
 
    return (
    <Layout 
    title="Shopping Cart"
    description="Manage your cart items. Add remove checkout or continue shopping."
    className="container-fluid"
    >

    <div className="row">
        <div className="col-6">
            {items.length > 0 ? showItems(items) : noItemMessage()}
        </div>

        <div className="col-6">
            <h2 className="mb-4">Your cart summay</h2>
           
               
            <hr/>
    <Checkout products = {items} setRun={setRun} run = {run} />
    </div>


    </div>

    </Layout>
    )}


export default Cart;
