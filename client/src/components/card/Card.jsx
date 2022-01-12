import React from "react";
import {connect} from "react-redux";

import {addToCartAction} from "../../redux/actionCreators/cartCreators";
import Button from "../button/Button";
import "./Card.css";
import ShowImage from "../showImage/ShowImage";

const Card = ({product, col, addToCartAction}) => {

    const handleClick = () => {
        addToCartAction(product);
    }

    return (
        <div className={`col-md-${col} bottomSpacing`}>
            <div className="card">
                <ShowImage product={product} />
                <div className="card-header">{product.description.slice(0, 25)} ...</div>
                <div className="card-footer d-flex justify-content-between">
                    <span>N{product.price}</span>
                    <Button 
                        type="button" 
                        className="smallBtn" text="ADD TO CART" 
                        onClick={() => handleClick()}
                    />
                </div>
            </div>
        </div>
    )
}

export default connect(null, {addToCartAction})(Card);