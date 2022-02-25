import React from "react"; 
import Card from "../card/Card";

const DisplayProducts = ({products, col}) => {
    console.log(products);
    
    return (
        <div className="row">
            {
                products.map(product => (
                    <Card key={product._id} product={product} col={col}/>
                ))
            }
        </div>
    )
}

export default DisplayProducts;