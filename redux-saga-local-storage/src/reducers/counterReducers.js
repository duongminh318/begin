import { INCREMENT, DECREMENT } from "../actions/actionTypes";

const initialState = 0;
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:

            return state+action.step;
        case DECREMENT:

           return state-action.step;


        default:
          return state;
    }

}
export default counterReducer;