import { MOST_SOLD_PHONES } from "../actionTypes/productTypes";

const INITIAL_STATE = {
    bestSellerPhones: []
}

const phonesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MOST_SOLD_PHONES: 
            return {...state, bestSellerPhones: [...action.payload]};

        default: return state;
    }
}

export default phonesReducer;