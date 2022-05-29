import React, {useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth'

import {getProduct, getCategories, updateProduct} from "./apiAdmin"

// We will make a get request to our backend to load the single Product with the productId. The productId, is 
// in the route. With the match we get the productId with the route parameter.
const UpdateProduct = ({match}) => {


    const {user, token} = isAuthenticated()
    
    // const [error, setError] = useState(false)
   // const [success, setSuccess] = useState(false)

    const [values, setValues] = useState({
       name: "",
       description: "",
       price: "" ,
       categories: [], // We will pull all the categories from the backend and then will populate the categories when we're trying to create a new product
       category: "",
       shipping: "",
       quantity: "",
       photo: "",
       loading: false,
       error: "",
       createdProduct: "",
       redirectToProfile: false,
       success: false,
       formData: ""
    })

    const { name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    
    formData} = values

    // When the component mount, init method runs, that will fetch the single product and then fetch the categories
    // as well
    const init = (productId) => {
        getProduct(productId).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }
            else {
                // populate the state
                // load categories
                console.log(data)
                setValues({...values, name: data.name, description: data.description,
                price: data.price,
                category: data.category._id,
                shipping: data.shipping,
                quantity: data.quantity,
                formData: new FormData() });
                initCategories()
            }
        })
    }

    // Load categories and set form data when the component mount
    const initCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
                setValues({...values, error: data.error})
            } else {
                setValues({ categories:data, formData: new FormData()});
            }
        });
    };

//     useEffect(() => {
//         setValues({...values, formData: new FormData()})
// }, [] )

    useEffect(() => {

        // Se obtiene el productId de la ruta utilizando match.params
        init(match.params.productId);
        
    }, [])

    const handleChange = name => event => {
        console.log(name)
        console.log(event.target.value)
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        console.log(formData)
        setValues({...values, [name]: value});
        
    }

    
    const clickSubmit = event => {
        //
        console.log(name)
        console.log(price)
        console.log(description)
        console.log(shipping)
        console.log(quantity)
        console.log(category)
        event.preventDefault()
        // setError("")
        console.log(formData)
        
        setValues({...values, error: '',  loading:true})

        updateProduct(match.params.productId, user._id, token, formData)
        .then(data => {
            if(data.error) {
                console.log(data.error)
                setValues({...values, error: data.error})

            } else {
                setValues({
                    ...values,
                    name:"",
                    description: "", 
                    photo: "",
                    price:"", 
                    quantity: "", 
                    loading: false,
                    redirectToProfile: true,
                    error: false,
                    createdProduct: data.name });
                    
            };
            
            
        });
        // init()
      
        // window.location.reload()
    };

    const newPostForm = () => (

        <form className="mb-3" // Gap below the form
         onSubmit={clickSubmit}>
        <h4>Post Photo</h4>
    
        <div className='form-group'>
            <label className='btn btn-secondary'> </label>
            <input onChange={handleChange("photo")} type="file" name="photo" accept="image/*" /> 
            
        </div>
        
        <div className='form-group'>
            <label className="text-muted">Name</label>
            <input
            onChange={handleChange("name")}
            type="text"
            className='form-control'
            value={name}
        />
        </div>
    
        <div className='form-group'>
            <label className="text-muted">Description</label>
            <textarea
            onChange={handleChange("description")}
            type="text"
            className='form-control'
            value={description}
        />
        </div>

        <div className='form-group'>
            <label className="text-muted">Price</label>
            <input
            onChange={handleChange("price")}
            type="number"
            className='form-control'
            value={price}
        />
        </div>


        <div className='form-group'>
            <label className="text-muted">Category</label>
            <select
            onChange={handleChange("category")}
            className='form-control'
        >
        <option>Please Select</option>
        {categories && categories.map((c,i) => (
            <option key={i} value = {c._id}>{c.name}</option>
        ))}


        {/* <option value="61f9a33958d1c2a9599c8739">Amazon Web Service</option>
        <option value="61f9a33958d1c2a9599c8739">Python</option> */}
        </select>
        </div>

        <div className='form-group'>
            <label className="text-muted">Shipping</label>
            <select
            onChange={handleChange("shipping")}
            className='form-control'
        >
          <option>Please Select</option>
        <option value="0">No</option>
        <option value="1">Yes</option>
        </select>
        </div>


        <div className='form-group'>
            <label className="text-muted">Quantity</label>
            <input
            onChange={handleChange("quantity")}
            type="number"
            className='form-control'
            value={quantity}
        />
        </div>

        <button className='btn btn-outline-primary'>Update Product</button>
        </form>
    );

    const showError = () => (

    
        <div className='alert alert-danger' style= {{display : error  ? '': 'none'}}>
        {error}
        </div>
        
    );

    // If the product was successfully created, the product name will be available here
    const showSuccess = () => (

        <div className='alert alert-info' style= {{display : createdProduct  ? '': 'none'}}>
       <h2>{`${createdProduct}`} is updated!</h2>
        </div>);

        
    // Redirect the user once the product was updated.
    const redirectUser = () => {
        if(redirectToProfile) {
            if(!error) {
                return <Redirect to="/">

                </Redirect>
            }
        }
    }

        

    const showLoading = () => 
    loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    );

    return (

        
            <Layout title="Add a new Product" description={`Good day ${user.name}, ready to add a new product!`}>
        
           
            <div className='row'>
        <div className='col-md-8 offset-md-2'>
        
        {showLoading()}
        
        {showSuccess() }
        {showError()}
        {newPostForm()}
        {redirectUser()}
         </div>
        
            </div>
            </Layout>
        );
};


export default UpdateProduct;