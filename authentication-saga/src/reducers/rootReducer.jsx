import { combineReducers } from 'redux';
import userReducer from './authReducer';

const rootReducer = combineReducers({
   userReducer,
});

export default rootReducer;