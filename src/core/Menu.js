import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'  // We don't want to reload the page each time we click the link
import {signout, isAuthenticated} from '../auth'     
import {itemTotal} from './cartHelpers'          
import "../styles.css"                                    // Access withRouter because we need to access the props history

// Histoy is the path , the actual path, and we will pass manually the path as the second argument,
// When the history is signup and the path is signup there is a match, and when is a match we can highligth
// it as an active class
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: '#ffffff'}
    }
}

// This props comes from the react router dom , because we are using withRouter. Passing {history} we 
// have access to the project history and we can use it
const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style= {isActive(history, "/")} to="/">Home</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style= {isActive(history, "/shop")} to="/shop">Shop</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link"
                 style= {isActive(history, "/cart")} 
                 to="/cart">
                 
                Cart <sup><small className='cart-badge'>{itemTotal()}</small></sup>
                 
                 </Link>
            </li>


            {/* <li className="nav-item">
                <Link className="nav-link" style= {isActive(history, "/user/dashboard")} to="/user/dashboard">
                Dashboard</Link>
            </li> */}
        
            {isAuthenticated() && isAuthenticated().user.role === 0 && (

            <li className="nav-item">
            <Link 
            className="nav-link"
            style= {isActive(history, "/user/dashboard")}
            to= "/user/dashboard">
            Dashboard
            </Link>
            </li>
                )}



        {isAuthenticated() && isAuthenticated().user.role === 1 && (

            <li className="nav-item">
            <Link 
            className="nav-link"
            style= {isActive(history, "/admin/dashboard")}
            to= "/admin/dashboard">
            Dashboard
            </Link>
            </li>
        )}
        
    

            {!isAuthenticated() && (

            <Fragment>
            <li className="nav-item">
            <Link className="nav-link" style= {isActive(history, "/signin")}  to="/signin">Signin</Link>
            </li>
            
               
              <li className="nav-item">
                <Link className="nav-link" style= {isActive(history, "/signup")} to="/signup">Signup</Link>
            </li>
            </Fragment>
        
            )}

            {isAuthenticated() && (

           <li className="nav-item">
                <span className="nav-link" style= {{cursor: 'pointer', color: '#ffffff'}} 
                onClick = {() => signout(() => { history.push("/");

                })}>
                Signout
            </span>    
            </li>
   
            )}

        

            

        </ul>
    </div>
)

export default withRouter(Menu);