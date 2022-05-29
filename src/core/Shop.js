import React, {useState, useEffect} from "react"
import Layout from "./Layout";
import { getCategories, getFilteredProducts } from "./apiCore";
import Card from "./Card";
import Checkbox from "./Checkbox";
import {prices} from "./fixedPrice";
import RadioBox from "./RadioBox"
 

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: {category: [] , price: []}
    })

    
    const [categories, setCategories]  = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
                setError(data.error)
            } else {
                setCategories(data);
            }
        });
    };


    const loadFilteredResults = newFilters  => {
        // console.log(newFilters)

        let toSkip = skip + limit
        getFilteredProducts(0, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.products) // This should give us all the products based on the filters, and we should have that data in the
                // state with the name of filteredResults
                setSize(data.size) // How many products we get
                setSkip(0) // Set to zero because we can use to load more
            }
        });
    };


    const loadMore = () => {
        // console.log(newFilters)

        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.products]); // This should give us all the products based on the filters, and we should have that data in the
                // state with the name of filteredResults
                console.log(data.size);
                setSize(data.size); // How many products we get
                setSkip(toSkip); // Set to zero because we can use to load more
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 && 
            size >= limit && (
                <button onClick = {loadMore} className="btn btn-warning mb-5">Load more</button>
            )
        );
    };

    useEffect(() => {
     
     init();
     //loadFilteredResults(skip, limit, myFilters.filters)

     console.log(skip);
     console.log(myFilters.filters);
     loadFilteredResults(skip, limit, myFilters.filters);

    } , []);

    // filteryBy is going to be either by category either by price
    // filters is the array of categories
    const handleFilters = (filters, filtersBy) => {
        //console.log("SHOP", filters, filtersBy)

        // newFilters MEANS WHAT WE HAVE IN STATE, that are both filters arrays for price and categories

        console.log("Filters are", filters)
        console.log("FiltersBy is" , filtersBy)
        
        console.log("Filters that we have in state", {...myFilters})
        const newFilters = {...myFilters}

        // NOW ACCESS STATE FILTERS BY EITHER 'category' or 'price', whatever is passed as an argument
        // La siguiente linea es necesaria para actualizar el objeto newFilters con su nuevo filtro correspondiente(filters)
        newFilters.filters[filtersBy] = filters
        console.log(newFilters)
        if (filtersBy === "price") {
            //const priceRange = prices.filter((price,index) => index === filters)

            let priceValues = handlePrice(filters);

            console.log(priceValues)
            newFilters.filters[filtersBy] = priceValues;

            
            
            console.log(filters)
            
        }
            
        console.log(myFilters.filters)
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value  => {
        const data = prices

        let array = []
        for (let key in data) {
            console.log(key)
            console.log(data[key]._id)
            if (Number(value) === Number(data[key]._id)) {

                //console.log(data[key].name)
                array = data[key].array;
               // array.push(data[key].name)
            }
            
        }
        console.log(array)
        return array
        
    }

    // const loadFilteredResults = (newFilters) => {
    //     console.log(newFilters)
    // }

    return( 

        <Layout title="Shop Page" description="Search and find books of your choice" className="container-fluid">
        {/* {JSON.stringify(productsByArrival)} */}
        
        <div className="row">
            <div className="col-4">

        <h4>Filter by Categories</h4>
            <ul>
            <Checkbox categories={categories}  handleFilters={filters =>
             handleFilters(filters, 'category')}/>
            </ul>

        <h4>Filter by price range</h4>
            
            <div>
            <RadioBox prices={prices}  handleFilters={filters =>
             handleFilters(filters, 'price')}/>           
            </div> 
            </div> 
            <div className="col-8">
            <h2 className="mb-4">Products</h2>
            <div className="row">
            {/* {filteredResults.map((product) => console.log(product))} */}
                {filteredResults.map((product,i) =>  (
                    <div key={i} className="col-4 mb-3">
                    <Card  product = {product} />
                    </div>
                ))}
        </div>
        <hr/>
            {loadMoreButton()}

        </div>
        </div>
               
        </Layout>
    )
}

export default Shop;

