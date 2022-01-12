import React from 'react'
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

import Button from '../button/Button';
import CartItem from '../cartItem/CartItem';
import {selectCartItems} from "../../selectors/cartSelector";
import { cartClickAction } from '../../redux/actionCreators/cartCreators';
import "./CartDropdown.css";

const CartDropdown = ({cartItems, history, cartClickAction}) => {
    return (
        <div className="dropDownBlock">
            <div className="innerCartBlock">
                {
                    cartItems.length ?
                        cartItems.map(cartItem => (
                            <CartItem key={cartItem._id} cartItem={cartItem} />
                        )) :
                        <div className="alert alert-success text-center">
                            <b>Cart is Empty</b>
                        </div>
                }
            </div>
            
            <Button 
                className="smallBtn checkkOutBtn" 
                text="GO TO CHECKOUT" 
                onClick={() => { history.push("/checkout"); cartClickAction(); }}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: selectCartItems(state)
    }
}

export default withRouter(
    connect(mapStateToProps, {cartClickAction})(CartDropdown)
    ) 
    
