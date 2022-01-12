import {combineReducers} from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authReducer";
import booksReducer from "./booksReducer";
import phonesReducer from "./phonesReducer";
import categoryReducer from "./categoryReducer";
import singleProductReducer from "./singleProductReducer";
import cartReducer from "./cartReducer";


const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["cart", "books", "phones", "singleProduct"]
}


const rootReducer = combineReducers({
    auth: authReducer,
    books: booksReducer,
    phones: phonesReducer,
    categories: categoryReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer
})

export default persistReducer(persistConfig, rootReducer);