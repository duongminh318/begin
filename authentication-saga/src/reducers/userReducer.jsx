import *as ActionType from '../constants/userActionTypes';

const initialState= {isLogin:localStorage.getItem("access_token")!=null}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.GET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ActionType.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        case ActionType.GET_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export default usersReducer