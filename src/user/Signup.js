import React, {useState} from "react";
import Layout from "../core/Layout";
import {Link} from "react-router-dom"
import {API} from "../config"
import {signup} from "../auth"

const Signup = () => {

    const [values, setValues] = useState({name:"" , email:"", password: "" , error:"", success:false})

    const handleChange = (event) => {
        //   console.log(e.target.value)
        
        // En el curso lo hace distinto. Ver cuaderno
        const {name, value} = event.target
          setValues({...values, error: false, [name]: value})

       //   setValues({name:e.target.value})
    }

    const {name, email, password, error, success} = values

    const clickSubmit = event => {

        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success:false})
                // We reset all the input fields after user was created.
            } else {
                setValues({
                    ...values,
                    name: "",
                    email:"",
                    password:"",
                    error: "",
                    success: true
                })
            }
        })
    }
   
    const SignUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" name ="name" value ={values.name} onChange = {handleChange}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" name ="email" value ={values.email} onChange = {handleChange} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" name ="password" value ={values.password} onChange = {handleChange} />
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </div>

        </form>
    )

    const showError = () => (
        <div className= "alert alert-danger" style={{display:error ? "" : 'none'}}>

            {error}
        </div>
    )

    // If success is true then this div will be showed to the user
    const showSuccess = () => (
        <div className = "alert alert-info" style = {{display: success ? "": 'none'}}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    )
        return (
            
            <Layout 

            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2">

            {showError()}
            {showSuccess()}
            {SignUpForm()}
            
            
            </Layout>
        
        
        )
 
}

export default Signup;

