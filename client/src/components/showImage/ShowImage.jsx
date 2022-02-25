import React from "react";
import {Link} from "react-router-dom";
import "./ShowImage.css";

const ShowImage = ({product}) => (
    <React.Fragment>
        <Link to={`/product/single/${product._id}/${product._category._id}`}>
            <img src={`/api/get/product/image/${product._id}`} alt={product.name} className="imageStyle card-img-top"/>
        </Link>
    </React.Fragment>
)

export default ShowImage;