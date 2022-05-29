import React , {useState} from "react"

import {Link, Redirect, useLocation} from 'react-router-dom';
import ShowImage from "./ShowImage";
import moment, { updateLocale } from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";


const Card = ({product, 
    showViewProductButton = true, 
    showAddToCartButton = true,
    cartUpdate = false, 
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined

    }) => {

    const [redirect ,setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const location = useLocation()
    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2">
                        View Product
                    </button>
                    </Link>
            )
        )};

    const addToCart = () => {
        console.log(product)
        addItem(product, () => {
            setRedirect(true)
        }) 
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to ="/cart"/>
        }
    }

    const showRemoveButton = showRemoveProductButton => {
    //  console.log(showRemoveProductButton)
    //  console.log(product._id)

     return  (
     showRemoveProductButton && (
     <button onClick={() => 
     
     {removeItem(product._id);
     setRun(!run)  // run useEffect in parent Cart 
     }} 
     className="btn btn-outline-danger mt-2 mb-2">
        Remove Product
    </button>
    
     )
    );
    };


    const showAddToCart = (showAddToCartButton) => {
     
        return  (
        showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
           Add to cart
       </button>
       
        )
       )
       }

    const showStock = (quantity) => {
        return quantity >0 ? (<span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
        <span className="badge badge-primary badge-pill">Out of Stock</span>
    )}

    const handleChange = productId => event => {
        console.log(event.target.value)
        setRun(!run) 
        setCount(event.target.value <1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value)
            
        }
    }
    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" 
            className="form-control"
            value={count}
            // We send the product._id because we need to know on which product we are updating the quantity, because
            // the cart may have many products.
            onChange={handleChange(product._id)} />
        </div>

        </div>
    };

    
    return (
     //   <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                {shouldRedirect(redirect)}

                <ShowImage item={product} url="product"/>
                {/* {console.log(product)} */}
                    <p className="lead mt-2">{product.description.substring(0,100)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                     <p className="black-8">
                         Added on {moment(product.createdAt).fromNow()}
                     </p>
                     {showStock(product.quantity)}
                        <br/>

                       {showViewButton(showViewProductButton)} 
                   {/* {console.log(location.pathname !== '/cart')} */}
                   {/* {location.pathname !== '/cart' ? 
                   showAddToCartButton()
                   : ''} */}

                   {showAddToCart(showAddToCartButton)}
                   
                   {showRemoveButton(showRemoveProductButton)}

                   {showCartUpdateOptions(cartUpdate)}

                </div>
            </div>
     //   </div>
    )
}

export default Card;
