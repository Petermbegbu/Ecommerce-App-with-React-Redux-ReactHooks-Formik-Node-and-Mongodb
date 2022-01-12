
export const addToCartFunc = (cartItems, cartItemToAdd ) => {
    const cartItemExist =  cartItems.find(cartItem => cartItem._id === cartItemToAdd._id);

    if(cartItemExist){
        const newCartItems = cartItems.map(cartItem => cartItem._id === cartItemToAdd._id ? 
            {...cartItem, cartQty: cartItem.cartQty + 1} : cartItem
        )

        return newCartItems;
    }

    return [...cartItems, {...cartItemToAdd, cartQty: 1}];
};

export const decreaseItemCartFunc = (cartItems, cartItemToDecrease ) => {
    
    const newCartItems = cartItems.map(cartItem => {
        if (cartItem._id === cartItemToDecrease._id) {
            if(cartItem.cartQty > 1){
                return  {...cartItem, cartQty: cartItem.cartQty - 1}
            }
        } else {
            return cartItem;
        }
    })

    return newCartItems;
};

export const removeFromCartFunc = (cartItems, itemToRemove) => {
    const newCartItems = cartItems.filter(cartItem => cartItem._id !== itemToRemove._id);

    return newCartItems;
}