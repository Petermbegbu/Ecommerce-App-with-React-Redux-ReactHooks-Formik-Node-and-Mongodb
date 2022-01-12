import axios from "axios";
import { MOST_SOLD_BOOKS, 
    MOST_SOLD_PHONES, 
    GET_PAGINATED_BOOKS, 
    GET_PAGINATED_PHONES,
    GET_RELATED_PRODUCTS,
    GET_SINGLE_PRODUCT } from "../actionTypes/productTypes";


export const bestSellerBooksAction = (sortBy, order, limit) => {
    return async (dispatch, getState) => {

        if(getState().categories.allCategories){
            const category = getState().categories.allCategories
                .filter(category => category.name === "books")

                try{
                const res = await axios.get(`/api/get/products?sortBy=${sortBy}&order=${order}&limit=${limit}&category=${category[0]._id}`);
                dispatch({type: MOST_SOLD_BOOKS, payload: res.data});
            } catch (error){
                console.log("Error Occured", error)
            }
        }
    }
}


export const getPaginatedBooksAction = (sortBy, order, limit, skip, bookSearchValue = "") => {
    return async (dispatch, getState) => {
        if(getState().categories.allCategories){
            const search = bookSearchValue;
            const category = getState().categories.allCategories
                .filter(category => category.name === "books")

            try{
                const res = await axios.get(`/api/get/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}&category=${category[0]._id}&search=${search}`);
                dispatch({type: GET_PAGINATED_BOOKS, payload: {
                    products: res.data.products,
                    totalPages: res.data.totalPages,
                    search: search
                }});            
            } catch (error){
                console.log("Error Occured", error)
            }
        }
    }
}


export const bestSellerPhonesAction = (sortBy, order, limit) => {
    return async (dispatch, getState) => {

        if(getState().categories.allCategories){
            const category = getState().categories.allCategories
                .filter(category => category.name === "phones")

                try{
                const res = await axios.get(`/api/get/products?sortBy=${sortBy}&order=${order}&limit=${limit}&category=${category[0]._id}`);

                dispatch({type: MOST_SOLD_PHONES, payload: res.data});
            } catch (error){
                console.log("Error Occured", error)
            }
        }
    }
}



export const getPaginatedPhonesAction = (sortBy, order, limit, skip, phoneSearchValue) => {
    return async (dispatch, getState) => {
        if(getState().categories.allCategories){
            const search = phoneSearchValue;
            const category = getState().categories.allCategories
                .filter(category => category.name === "phones")

            try{
                const res = await axios.get(`/api/get/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}&category=${category[0]._id}&search=${search}`);
                dispatch({type: GET_PAGINATED_PHONES, payload: {
                    products: res.data.products,
                    totalPages: res.data.totalPages,
                    search: search
                }});  
            } catch (error){
                console.log("Error Occured", error)
            }
        }
    }
}



export const searchProductAction = (sortBy, order, limit, skip, search, categoryName) => {
    return async (dispatch, getState) => {
        if(getState().categories.allCategories){
            const category = getState().categories.allCategories
                .filter(category => category.name === categoryName)

            try{
                const res = await axios.get(`/api/get/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}&category=${category[0]._id}&search=${search}`);

                if(categoryName === "phones"){
                    dispatch({type: GET_PAGINATED_PHONES, payload: {
                        products: res.data.products,
                        totalPages: res.data.totalPages,
                        search: search
                    }});
                } else if (categoryName === "books") {
                    dispatch({type: GET_PAGINATED_BOOKS, payload: {
                        products: res.data.products,
                        totalPages: res.data.totalPages,
                        search: search
                    }});
                } else {
                    dispatch({type: GET_PAGINATED_BOOKS, payload: {
                        products: res.data.products,
                        totalPages: res.data.totalPages,
                        search: search
                    }});                }

            } catch (error){
                console.log("Error Occured", error)
            }
        }
    }
}



export const getSingleProductAction = (productId) => {
    return async (dispatch) => {

        try{
            const res = await axios.get(`/api/get/product/${productId}`);

            dispatch({type: GET_SINGLE_PRODUCT, payload: res.data});  
        } catch (error){
            console.log("Error Occured", error)
        }

    }
}


export const getRelatedProductsAction = (productId, categoryId) => {

    return async (dispatch) => {
        try{
            const res = await axios.get(`/api/get/products/related/${productId}/${categoryId}?order=desc&limit=4&sortBy=name`);

            dispatch({type: GET_RELATED_PRODUCTS, payload: res.data}); 
        } catch (error){
            console.log("Error Occured", error)
        }
       
    }
}



