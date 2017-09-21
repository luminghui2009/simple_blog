import {createStore,applyMiddleware} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import reducer from './reducer';
export default createStore(reducer,applyMiddleware(thunkMiddleWare));