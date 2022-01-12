import React from 'react'
import {connect} from "react-redux";

import { selectCartItems, selectCartTotalAmount } from '../../selectors/cartSelector';
import CheckoutItems from '../checkoutItems/CheckoutItems';
import Layout from '../Layout/Layout';

const CheckoutPage = ({cartItems, cartTotalAmount}) => {
    const title = "Checkout Page"

    const table = () => (
        <div>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems && cartItems.map( cartItem => (
                            <CheckoutItems key={cartItem._id} cartItem={cartItem} />
                        ))
                    }
                </tbody>
            </table>
            <div className="my-4">
                <h3 className="text-right">{`TOTAL   N${cartTotalAmount}`}</h3>
            </div>
        </div>
    )

    return (
        <Layout title={title} 
            description="You can Proceed To Payment" 
            className="container"
        > 
            <div>
                {
                    cartItems.length ? 
                        table() :
                        <div className="alert alert-success text-center">
                            <b>Your cart is empty!! Can't proceed to payment</b>
                        </div>
                }
            </div>

        </Layout>

        
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: selectCartItems(state),
        cartTotalAmount: selectCartTotalAmount(state)
    }
}

export default connect(mapStateToProps)(CheckoutPage);