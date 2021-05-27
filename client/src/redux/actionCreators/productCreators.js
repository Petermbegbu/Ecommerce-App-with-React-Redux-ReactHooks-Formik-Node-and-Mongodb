import { MOST_SOLD_BOOKS, MOST_SOLD_PHONES } from "../actionTypes/productTypes";
import axios from "axios";

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