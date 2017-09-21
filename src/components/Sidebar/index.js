import React from 'react';
import {Link} from 'react-router-dom';
import './index.less';
export default class Sidebar extends React.Component{
    handleClick=(e,_id)=>{
        e=e||window.event;
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue=false;
        }
        this.props.changeArticle(_id);
    }
    render(){
        return(
            <div id="sidebar">
                <h1><a href="">个人博客</a></h1>
                <p>作者：<a href="">路</a></p>
                <p>邮箱：12133131333</p>
                <p>
                    <Link to="/login">管理员登录</Link>
                    {sessionStorage.getItem('__token__')&&sessionStorage.getItem('__username__')=='host'?<Link to='/write/new'>发表文章</Link>:null}
                </p>
                <b style={{lineHeight:'40px'}}>目录：</b>
                <ol>
                    {this.props.articles.length>0?this.props.articles.map((item,index)=>(
                        <li key={index}><a onClick={(e) =>this.handleClick(e,item._id)}>{item.title}</a></li>
                    )):null}
                </ol>
            </div>
        )
    }
}