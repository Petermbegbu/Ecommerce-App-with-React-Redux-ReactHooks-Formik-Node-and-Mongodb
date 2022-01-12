import { MOST_SOLD_BOOKS, GET_PAGINATED_BOOKS } from "../actionTypes/productTypes";

const INITIAL_STATE = {
    bestSellerBooks: [],
    paginatedBooks: [],
    totalPages: 0,
    bookSearchValue: "",
}

const booksReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MOST_SOLD_BOOKS: 
            return {...state, bestSellerBooks: [...action.payload.products]};

        case GET_PAGINATED_BOOKS: 
            return {...state, paginatedBooks: [...action.payload.products], 
                totalPages: action.payload.totalPages, bookSearchValue: action.payload.search };

        default: return state;
    }
}

export default booksReducer;