import { GET_ALL_CATEGORIES } from "../actionTypes/categoryTypes";

const INITIAL_STATE = {
    allCategories: null
}

const categoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_CATEGORIES: 
            return {...state, allCategories: action.payload};

        default: return state;
    }
}

export default categoryReducer;