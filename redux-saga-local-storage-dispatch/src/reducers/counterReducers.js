import { INCREMENT, DECREMENT,LOG } from "../actions/actionTypes";

const initialState = { times: 0, statusLog: "" };
const counterReducers = (state = initialState, action) => {
    // console.log("ahihi");
    switch (action.type) {
        case INCREMENT:

            return { ...state, times: state.times + action.step };
        case DECREMENT:

            return { ...state, times: state.times - action.step };

          case LOG:

            return { ...state, statusLog: action.payload };

        default:
            return state;
    }

}
export default counterReducers;