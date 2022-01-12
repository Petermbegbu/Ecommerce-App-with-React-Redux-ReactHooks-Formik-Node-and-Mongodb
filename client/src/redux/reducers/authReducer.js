import {SIGN_IN, LOG_OUT, GET_CURRENT_USER} from "../actionTypes/authTypes";

const INITIAL_STATE = {
    isSignedIn: false,
    user: null
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN: return {...state, isSignedIn: true, user: action.payload};

        case LOG_OUT: return {...state, isSignedIn: false, user: null};

        case GET_CURRENT_USER: return {...state, user: action.payload, 
            isSignedIn: action.payload ? true : false};

        default: return state;
    }
}

export default authReducer;