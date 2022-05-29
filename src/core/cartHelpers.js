export const addItem = (item, next) => {
    console.log(item._id)
let cart = []
 if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
        ...item,   //we set the item that we are sending
        count:1 
    })

    // remove duplicates
    // build an Array from new Set and turn it back into array using Array.from
    // so that later we can re-map it
    // new set will only allow unique values in it
    // so pass the ids of each object/product
    // If the loop tries to add the same value again, it'll get ignored 
    // ...with the array of ids we got on when first map() was used 
    // run map() on it again and return the actual product from the cart

    // Create an array to make sure that the product is not duplicated. Set would remove duplicates
    // p is the product that comes from the card that show the product the user had clicked

    cart = Array.from(new Set(cart.map(p=> p._id))).map(id => {

        return cart.find(p => p._id === id); // We loop through the product in the cart and compare with the id that we get from this new array
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
}

}
    // use the callback next to do something once we add to the local storage

    // Use this method in the Menu
    
    export const itemTotal = () => {
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                return JSON.parse(localStorage.getItem('cart')).length
            }
        }
        return 0

    }

    // The getCart method will give us all the items from the Cart. We can use it in the Cart Component.
    export const getCart = () => {
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                return JSON.parse(localStorage.getItem('cart'))
            }
        }
        return [];

    };

    export const updateItem = (productId, count) => {
        let cart = []
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))

            }
            cart.map((product,i) => {
                if(product._id === productId) {
                    cart[i].count = count;
                }
            })

            //  After the update of the product, we set back the Local Storage, with the updated cart.
            localStorage.setItem('cart', JSON.stringify(cart))

        }
    };


    export const removeItem = (productId) => {
        console.log('in removeItem', productId)
        let cart = []
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))

            }
            cart.map((product,i) => {
                if(product._id === productId) {
                    // First argument is the index from where to splice and the second one is how many to splice
                    cart.splice(i, 1)
                }
            });
            
            console.log('cart after remove item', cart)
            //  After the update of the product, we set back the Local Storage, with the updated cart.
            localStorage.setItem('cart', JSON.stringify(cart))

        }

        return cart; // We need to add this for have the new cart with the removed item in our application. 
        // Is for updating our application
     };

     // Once you empty the cart if you want to store some kind of message to the user, you are able using the next
     // parameter
     export const emptyCart = next => {
         if(typeof window !== 'undefined') {
             localStorage.removeItem('cart')
             next()
         }
     };