import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((totalQty, cartItem) =>(
        cartItem.cartQty + totalQty
    ), 0)
)

export const selectCartTotalAmount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((totalAmount, cartItem) =>(
        totalAmount + (cartItem.price * cartItem.cartQty)
    ), 0)
)