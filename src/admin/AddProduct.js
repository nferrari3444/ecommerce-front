import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth'
import {createCategory, categories, getCategories} from './apiAdmin'
import {createProduct} from "./apiAdmin"


const AddProduct = () => {
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
    success,
    formData} = values

    // Load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories:data, formData: new FormData()});
            }
        });
    };

//     useEffect(() => {
//         setValues({...values, formData: new FormData()})
// }, [] )

    useEffect(() => {

        // setValues({formData: new FormData()})
        init();
        
    }, [])

    const handleChange = name => event => {
        
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
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
        {console.log(error)}
        setValues({...values, loading:true})
        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error) {
                console.log(data.error)
                setValues({...values, success: false, error: data.error})

            } else {
                setValues({
                    ...values, name:"", description: "", photo: "", price:"", quantity: "", 
                    loading: false, success: true, error: "",  createdProduct: data.name, formData: new FormData()});
                    
            };
            
            
        });
        // init()
      
        // window.location.reload()
    }

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

        <button className='btn btn-outline-primary'>Create Product</button>
        </form>
    );

    const showError = () => (

    
        <div className='alert alert-danger' style= {{display : error  ? '': 'none'}}>
        {error}
        </div>
        
    );

    // If the product was successfully created, the product name will be available here
    const showSuccess = () => {
    //    { console.log('llega caaa')}
    // {
        console.log(success)
        if (success) {
        return    (
        <div className='alert alert-info' style= {{display : createdProduct  ? '': 'none'}}>
       <h2>{`${createdProduct}`} is created!</h2>
        </div>)
    }};
        
    

        

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
        { showError()}
        {newPostForm()}
         </div>
        
            </div>
            </Layout>
        );
};


export default AddProduct;