import * as Types from '../action-type';
import {combineReducers} from 'redux';
let initState={articles:[],article:{}};
const getArticles=(state=initState,action)=>{
    switch(action.type){
        case Types.GET_ARTICLES:
            return state={...state,articles:action.articles};
            break;
        case Types.GET_ARTICLE_BY_ID:
            return state={...state,article:action.article};
            break;
        default:
            return state;
            break;
    }

};
export default combineReducers({getArticles})