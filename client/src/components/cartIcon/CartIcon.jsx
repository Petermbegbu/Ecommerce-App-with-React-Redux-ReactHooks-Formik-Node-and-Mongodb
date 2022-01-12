import React from 'react';
import {connect} from "react-redux";

import {selectCartItemCount} from "../../selectors/cartSelector";
import "./CartIcon.css";

const CartIcon = ({totalCartItem}) => {
    return (
        <div className="cartIcon">
            <b>Cart</b>
            <span className="badge badge-danger"> {totalCartItem} </span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        totalCartItem: selectCartItemCount(state)
    }
}

export default connect(mapStateToProps)(CartIcon);