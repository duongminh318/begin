import { combineReducers } from "redux";
import counterReducers from "./counterReducers";

const rootReducer = combineReducers({
    counterReducers   // key là counterReducers
});

export default rootReducer;

