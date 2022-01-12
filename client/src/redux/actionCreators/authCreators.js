import {SIGN_IN, LOG_OUT, GET_CURRENT_USER} from "../actionTypes/authTypes";
import axios from "axios";

export const signInAction = (user) => {
    return {
        type: SIGN_IN,
        payload: user
    }
}


export const logOutAction = () => {

    return {
        type: LOG_OUT,
    }
}


export const getCurrentUserAction = () => {
    return async (dispatch) => {
        try{
            const res = await axios.get("/api/currentUser");
            dispatch({type: GET_CURRENT_USER, payload: res.data.user});
        } catch (error){
            console.log("Error Occured", error)
        }
    }
}
