import React from 'react'

import "./CartItem.css";

export default function CartItem({cartItem}) {
    return (
        <div className="row mb-2">
            <div className="col-md-4">
                <img src={`/api/${cartItem.image}`} 
                    alt={cartItem.name} 
                    className="cartImage"
                />
            </div>
            <div className="col-md-8">
                <div className="itemDetails mb-1">{cartItem.name}</div>
                <div className="itemDetails">{cartItem.cartQty} X N{cartItem.price}</div>
            </div>
        </div>
    )
}
