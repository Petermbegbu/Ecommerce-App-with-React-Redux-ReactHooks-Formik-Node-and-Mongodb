import { MOST_SOLD_PHONES, GET_PAGINATED_PHONES } from "../actionTypes/productTypes";

const INITIAL_STATE = {
    bestSellerPhones: [],
    paginatedPhones: [],
    totalPages: 0,
    phoneSearchValue: ""
}

const phonesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MOST_SOLD_PHONES: 
            return {...state, bestSellerPhones: [...action.payload.products]};

        case GET_PAGINATED_PHONES: 
            return {...state, paginatedPhones: [...action.payload.products], 
                totalPages: action.payload.totalPages, phoneSearchValue: action.payload.search};


        default: return state;
    }
}

export default phonesReducer;