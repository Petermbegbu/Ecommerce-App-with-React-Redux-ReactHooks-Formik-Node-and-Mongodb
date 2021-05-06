import {SIGN_IN, LOG_OUT, GET_CURRENT_USER} from "../actionTypes/authTypes";

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

export const getCurrentUserAction = (user) => {
    
    return {
        type: GET_CURRENT_USER,
        payload: user
    }
}
