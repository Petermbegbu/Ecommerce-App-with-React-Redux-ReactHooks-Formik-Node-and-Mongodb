import {combineReducers} from "redux";
import authReducer from "./authReducer";
import booksReducer from "./booksReducer";
import phonesReducer from "./phonesReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    books: booksReducer,
    phones: phonesReducer,
    categories: categoryReducer
})

export default rootReducer;