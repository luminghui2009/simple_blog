import 'whatwg-fetch';
import 'es6-promise';
import * as Types from '../action-type';
const url="http://localhost:3000";
export const getArticlesBySort=(sort)=>{
    return dispatch=>{
        return fetch(url+'/getArts',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({sort}),
            mode: 'cors'
        }).then(res=>res.json()).then(data=>{
            dispatch({
                type:Types.GET_ARTICLES,
                articles:data.articles
            });
        })
    }
}
export const sendArticle=(_id,sort,title,content,token)=>{
    const url='http://localhost:3000/post';
    return fetch(url,{
        method:'post',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({_id,sort,title,content,token,create_time:Date.now()})
    }).then(res=>res.json()).then(data=>{
        console.log(data);
    })
}
export const getArticleById=(_id)=>{
    return dispatch=>{
        const url = 'http://localhost:3000/getArtById'
        return fetch(url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id })
        }).then(res=>res.json()).then(data=>{
            dispatch({
                type:Types.GET_ARTICLE_BY_ID,
                article:data.article
            })
        });
    }
}
