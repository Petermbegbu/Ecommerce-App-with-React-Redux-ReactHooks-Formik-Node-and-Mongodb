import { GET_ALL_CATEGORIES } from "../actionTypes/categoryTypes";
import axios from "axios";

export const getCategoriesAction = () => {
    return async (dispatch) => {
        try{
            const res = await axios.get(`/api/categories`);
            dispatch({type: GET_ALL_CATEGORIES, payload: res.data});
        } catch (error){
            console.log("Error Occured", error)
        }
    }
}
