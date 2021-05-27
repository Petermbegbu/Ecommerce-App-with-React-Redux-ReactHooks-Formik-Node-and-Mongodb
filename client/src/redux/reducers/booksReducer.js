import { MOST_SOLD_BOOKS } from "../actionTypes/productTypes";

const INITIAL_STATE = {
    bestSellerBooks: []
}

const booksReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MOST_SOLD_BOOKS: 
            return {...state, bestSellerBooks: [...action.payload]};

        default: return state;
    }
}

export default booksReducer;