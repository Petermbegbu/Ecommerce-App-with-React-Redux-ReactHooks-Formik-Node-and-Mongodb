import { GET_SINGLE_PRODUCT, GET_RELATED_PRODUCTS } from "../actionTypes/productTypes";

const INITIAL_STATE = {
    singleProductDetails: null,
    relatedProducts: null
}

const singleProductReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_SINGLE_PRODUCT: 
            return {...state, singleProductDetails: {...action.payload}};

        case GET_RELATED_PRODUCTS: 
            return {...state, relatedProducts: action.payload};

        default: return state;
    }
}

export default singleProductReducer;