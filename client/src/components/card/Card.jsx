import React from "react";
// import {Link} from "react-router-dom";

import "./Card.css";


import ShowImage from "../showImage/ShowImage";

const Card = ({product}) => {
    return (
        <div className="col-md-4 mb-5">
            <div className="card">
                <ShowImage imageUrl={product.image} name={product.name} />
                <div className="card-header">{product.name}</div>
                <div className="card-footer d-flex justify-content-between">
                    <span>N{product.price}</span>
                    <button type="button" className="btn btn-dark">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card;