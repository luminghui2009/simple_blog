import React from 'react';
import { connect } from "react-redux";
import NProgress from 'nprogress'
import Article from "../../../../components/Article/index";
import Sidebar from "../../../../components/Sidebar/index";
import {getArticleById, getArticlesBySort} from '../../../../action/index';
NProgress.configure({ showSpinner: false });
class Index extends React.Component{
    constructor(){
        super();
        this.state={
            article:''
        };
    }
    componentDidMount(){
        let { dispatch }=this.props;
        let sort="all";
        NProgress.start()
        dispatch(getArticlesBySort(sort)).then(()=>{
            this.setState({
                ...this.state,article:this.props.getArticles.articles[0]
            });
            NProgress.done();
        });
    }
    handleChange=(_id)=>{
        const {dispatch}=this.props;
        NProgress.start();
        this.props.history.push(`/?id=${_id}`);
        dispatch(getArticleById(_id)).then(()=>{
            this.setState({
                ...this.state,article:this.props.getArticles.article
            });
            NProgress.done();
        });
    }
    render(){
        console.log(_store.getState());
        return(
            <div>
                <Article article={this.state.article}/>
                <Sidebar articles={this.props.getArticles.articles} changeArticle={this.handleChange}/>
            </div>
        )
    }
};
export default connect(state=>({...state}))(Index)