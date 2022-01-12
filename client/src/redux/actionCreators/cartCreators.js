import { ADD_TO_CART, REMOVE_FROM_CART, CART_ICON_CLICK, DECREASE_ITEM_CART } from "../actionTypes/cartTypes";


export const addToCartAction = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item
    }
}

export const decreaseCartAction = (item) => {
    return {
        type: DECREASE_ITEM_CART,
        payload: item
    }
}

export const removeFromCartAction = (item) => {
    return {
        type: REMOVE_FROM_CART,
        payload: item
    }
}

export const cartClickAction = () => {
    return {
        type: CART_ICON_CLICK,
    }
}

