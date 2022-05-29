import React from "react";
import Menu from "./Menu";
import  "../styles.css"
// This would be our layout, we should be able to see this layout in any of the pages.

// We will be able to pass these properties from any other places where we use this layout and that way we can 
// dynamically display this content. We also send the className as props. The content will be available
// at the children props.


const Layout = ({title = "title" , description = "description", className, children}) => (

// The page is serving the layout so we can have the menu here and get rid of the menu from the Routes.js file
    <div>
     <Menu/>
        <div className = "jumbotron">
            <h2>{title}</h2>
            <p className="lead"> {description}</p>
        </div>
        <div className= {className}> {children}</div>
    </div>
);




export default Layout;
