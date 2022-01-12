import React, {useEffect} from 'react'
import { connect } from "react-redux";
import Layout from '../Layout/Layout';
import { getSingleProductAction, getRelatedProductsAction } from '../../redux/actionCreators/productCreators';
import Button from '../button/Button';
import DisplayProducts from "../displayProducts/DisplayProducts";
import { addToCartAction } from '../../redux/actionCreators/cartCreators';
import "./SingleProduct.css";


const SingleProduct = ({match, history, productDetails, relatedProducts, getRelatedProductsAction, 
    getSingleProductAction, addToCartAction}) => {
    // const [productId, setProductId] = useState(null);
    // const [categoryId, setCategoryId] = useState(null);
    const productId = match.params.productId;
    const categoryId = match.params.categoryId;

    const actions = async () => {
        await getSingleProductAction(productId);
        await getRelatedProductsAction(productId, categoryId);
    }

    useEffect(() => {
        actions()
    }, [productId, categoryId]);


    const relatedProductsBlock = () => (
        <div>
            {relatedProducts && <DisplayProducts products={relatedProducts} col="3"/>}
        </div>
    )

    
    const handleClick = () => {
        addToCartAction(productDetails);
    }

    return (
        <Layout 
            title="Single Product Page" 
            description="Node React E-commerce App" 
            className="container"
        >
            <div>
                <div className="mb-4">
                    <Button 
                        className="smallBtn"
                        text="GO BACK" 
                        onClick={() => history.goBack()}
                    />
                </div>

                <div className="row">
                    <div className="col-md-5">
                        {
                            productDetails && (
                                <div>
                                    <img src={`/api/${productDetails.image}`} alt={productDetails.name} className="singleImage"/>
                                </div>
                            )
                        }
                    </div>

                    <div className="col-md-5">
                        {
                            productDetails && (
                                <div>
                                    <h4 className="mb-4">{productDetails.name.toUpperCase()}</h4>
                                    <p>{productDetails.description}</p>
                                    <p className="border-top bold">
                                        Price: N{productDetails.price}
                                    </p>
                                    <p className="border-top bold">Status: 
                                        {productDetails.quantity === 0 ? 
                                        <span> Out Of Stock</span> : <span> In Stock</span> }
                                    </p>
                                    <p className="border-top bold">
                                        Category: {productDetails._category.name}
                                    </p>
                                    <Button 
                                        className="largeBtn" 
                                        text="Add To Cart"
                                        onClick={() => handleClick()}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="mt-5">
                    <h4>RELATED PRODUCTS</h4>

                    {relatedProductsBlock()}
                </div>
            </div>
        </Layout>
    )
}


const mapStateToProps = (state) => {
    const {singleProduct} = state;

    return {
        productDetails: singleProduct.singleProductDetails,
        relatedProducts: singleProduct.relatedProducts
    }
}


export default connect(mapStateToProps, 
    {getSingleProductAction, getRelatedProductsAction, addToCartAction})(SingleProduct);
