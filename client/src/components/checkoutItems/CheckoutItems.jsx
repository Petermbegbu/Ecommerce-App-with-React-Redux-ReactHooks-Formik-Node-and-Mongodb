import React from 'react'
import {FaTrashAlt, FaPlusSquare, FaMinusSquare} from "react-icons/fa";
import { connect } from 'react-redux';

import { removeFromCartAction, addToCartAction, decreaseCartAction } from '../../redux/actionCreators/cartCreators';
import "./CheckoutItems.css";

const CheckoutItems = ({cartItem, removeFromCartAction, addToCartAction, decreaseCartAction}) => {

    return (
        <tr>
            <td className="align-middle">
                <img src={`/api/get/product/image/${cartItem._id}`} alt={cartItem.name} className="cartImage"/>
            </td>
            <td className="align-middle">{cartItem.name}</td>
            <td className="align-middle">
                <FaMinusSquare 
                    color="black" size="20px" className="mr-2"
                    onClick={() => cartItem.cartQty > 1 ? decreaseCartAction(cartItem) : ""} 
                />

                {cartItem.cartQty}
                
                <FaPlusSquare 
                    color="black" size="20px" className="ml-2"
                    onClick={() => addToCartAction(cartItem)}
                />
            </td>
            <td className="align-middle">N{cartItem.price}</td>
            <td className="align-middle">
                <FaTrashAlt className="pointer" onClick={() => removeFromCartAction(cartItem)}/>
            </td>
        </tr>
    )
}

export default connect(null, 
    {removeFromCartAction, addToCartAction, decreaseCartAction})(CheckoutItems)