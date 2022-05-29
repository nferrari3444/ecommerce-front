import React, {useState, useEffect} from "react";

const Checkbox = ({categories, handleFilters}) => {

    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
    
        // return the first index or -1
        const currentCategoryId = checked.indexOf(c)  // Tell us if the category id is already in the state

        // This will give us all the categories ids in the state
        const newCheckedCategoryId = [...checked]

        // if currently checked was not already in checked state > push
        // else pull/take off

        if(currentCategoryId === -1) {

            // The category is not already in the state, so we push the category in the state
            newCheckedCategoryId.push(c)
        } else {

            // If the category is already checked, then we need to unchecked
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }

        console.log(newCheckedCategoryId) // Will give us the categories array in the console
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
        //handleFilters(checked)
    }

    return categories.map((c,i) => (

        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value =     {checked.indexOf(c._id !== -1)}
             type="checkbox" className="form-check-input" />
            <label className="form-check-label">{c.name}</label>
        
        
        </li>
    ))
}

export default Checkbox;

