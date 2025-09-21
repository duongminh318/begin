import { INCREMENT, DECREMENT } from "../actions/actionTypes";

const initialState = 0;
const counterReducers = (state = initialState, action) => {
    // console.log("ahihi");
    switch (action.type) {
        case INCREMENT:

            return state + action.step;
        case DECREMENT:

            return state - action.step;


        default:
            return state;
    }

}
export default counterReducers;