import React from "react";
import "./ShowImage.css";

const ShowImage = ({imageUrl, name}) => (
    <React.Fragment>
        <img src={`api/${imageUrl}`} alt={name} className="imageStyle card-img-top"/>
    </React.Fragment>
)

export default ShowImage;