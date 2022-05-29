import React, {useState} from "react";
import Layout from "../core/Layout";
import {Redirect} from "react-router-dom"
import {API} from "../config"
import {signin, authenticate, isAuthenticated} from "../auth"

const Signin = () => {

    const [values, setValues] = useState({email:"", password: "" , error:"", loading:false,
    redirectToReferrer: false})

    // Destructure these values from the state
    const {email, password, loading, error, redirectToReferrer} = values

    const {user} = isAuthenticated()

    // const {name, value} = event.target
    const handleChange =  (event) => {
        //   console.log(e.target.value)
        
        // En el curso lo hace distinto. Ver cuaderno
        const {name} = event.target
          setValues({...values, error: false, [name]: event.target.value})

       //   setValues({name:e.target.value})
    };

    

    const clickSubmit = event => {

        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading:false})
                // We reset all the input fields after user was created.
            } else {

                authenticate(data, () => {

                    // We can get rid of all the variables(name, email, password) becuase we are going to redirect the user to some other page like homepage, dashboard
                setValues({
                    ...values,
                    redirectToReferrer: true
                });
             });
            }
        });

      
    };
   
    const SignInForm = () => (
        <form>
           

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" name ="email"  onChange = {handleChange} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" name="password"  onChange = {handleChange} />
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </div>

        </form>
    );

    const showError = () => (
        <div className= "alert alert-danger" style={{display:error ? "" : 'none'}}>

            {error}
        </div>
    );

 
    const showLoading = () => {

        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );
        };

    const redirectUser = () => {
        if(redirectToReferrer) {

            if(user && user.role ===1){
                return <Redirect to ="/admin/dashboard" />
            }
            else {
                return <Redirect to="/user/dashboard" />
            };

            if( isAuthenticated()) {
                return <Redirect to ="/" />
            };
        };
    };

        return (
            
            <Layout 

            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2">

            {showError()}
            {showLoading()}
            {SignInForm()}
            {redirectUser()}
            
            </Layout>
        
        
        );
 
};

export default Signin;

