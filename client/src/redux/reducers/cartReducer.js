import { ADD_TO_CART, REMOVE_FROM_CART, CART_ICON_CLICK, DECREASE_ITEM_CART } from "../actionTypes/cartTypes";
import {addToCartFunc, removeFromCartFunc, decreaseItemCartFunc} from "./reducerUtils";

const INITIAL_STATE = {
    cartItems: [],
    isCartHidden: false
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TO_CART: 
            return {...state, cartItems: addToCartFunc(state.cartItems, action.payload)};
        
        case DECREASE_ITEM_CART: 
            return {...state, cartItems: decreaseItemCartFunc(state.cartItems, action.payload)};
      
        case REMOVE_FROM_CART: 
            return {...state, cartItems: removeFromCartFunc(state.cartItems, action.payload)};

        case CART_ICON_CLICK: 
            return {...state, isCartHidden: !state.isCartHidden};
      
        default: return state;
    }
}

export default cartReducer;