import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducer/user";
import requestReducer from './reducer/request';
import thunk from 'redux-thunk';
import groupReducer from './reducer/group';
import chatReducer from './reducer/chat';
const rootReducer = combineReducers({ userState: userReducer, requestReducer, groupReducer, chatReducer })
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;