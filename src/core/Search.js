import React, {useState, useEffect} from "react"
import {getCategories, list} from "./apiCore"
import Card from "./Card"


const Search = () => {

    const [data, setData] = useState({
        categories: [],   // We will make API request to get all the categories because we want to show the list of categories in
                            // the dropdown and the input type with the search.
        category: '',       // When user picks a particular category that we want, we want to store here
        search: '',       // Whatever value we get on the search
        results: [] ,          // We can store all the products in the results
        searched: false
    })

    const {categories, category, search, results, searched} = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories: data})
            }
        })
    }

    // We want to run the getCategories method whenever the component mount.

    useEffect(() => {
        loadCategories() // We get all the categories and populate the state
    } , [])

    const searchData = () => {
    //    console.log(search, category)
        if(category || search) {
            console.log('category', category)
            console.log('search', search)
            list({search: search || undefined, category: category})
            .then(response => {
                console.log(response)
                if(response.error) {
                    console.log(response.error())
                } else {
                    setData({...data, results: response, searched:true})
                }
            })
        }

}

    const searchSubmit = e => {
      e.preventDefault();
      searchData()
    };

   
    // La variable name puede ser la categoria o el search(lo que escribió el usuario)
    const handleChange = name => event  => {
        console.log('name',name)
        console.log(event.target.value)
        setData({...data, [name]:  event.target.value, searched: false})
    }


    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Found ${results.length} products`
        }
        if (searched && results.length <1) {
            return `No products found`;
        }
    };

    // Give a default value to the results variable as an empty array because sometimes the results were not in the state
    // We loop through all the products that we have in the results
    const searchedProducts = (results = []) => {
        return (

            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}

                </h2>
            
            <div className="row">
                {results.map(( product, i) =>(

                     <Card key= {i} product = {product} /> ))}
            </div>
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit} >
        <span className="input-group-text">
            <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                <select 
                className="btn mr-2"
                onChange={handleChange("category")}
                >

                    <option value="All">All</option>
                {categories.map((c,i) => (
                    <option key= {i} value={c._id}>
                        {c.name}
                    </option>
                ))}

                </select>
                </div>
                </div>
        
        <input 
        type="search" 
        className="form-control" 
        onChange={handleChange('search')}
        placeholder = "Search by name"
        />
        
        <div className="btn input-group-append" style={{border: 'none'}}>
            <button className="input-group-text">Search</button>
        </div>
</span>
        </form>
    )
    
    // results are all the products in the state
    return (
    <div className="row">
        <div className="container mb-3">{searchForm()} </div>
        <div className="container-flud mb-3"></div>
        {searchedProducts(results)} 


    </div>);

};

export default Search;
