import React from 'react';
import './index.less';
import {sendArticle} from '../../action';
import {connect} from 'react-redux'
let marked = require('marked');
class Write extends React.Component{
    constructor(){
        super();
        this.state={
            height:'100px',
            write:'markdown'
        };
    }
    componentDidMount(){
        let{dispatch}=this.props;
        let {id}=this.props.match.params;
    }
    handleSend=()=>{
        let sort;
        const _id=this.props.match.params.id,
            title=document.querySelector(".title").value,
            content=this.state.write,
            token=sessionStorage.getItem('__token__');
            if(token&&sessionStorage.getItem('__username__')=='host'){
                sort=document.querySelector("#sort").value;
                sendArticle(_id, sort, title, content, token).then(this.props.history.push(`/?id=${_id}`))
            }

    };
    render(){
        return(
            <div id='write'>
                <div className='left' style={{height:this.state.height}}>
                    <input type="text" className='title'/>
                    {sessionStorage.getItem("__token__")&&sessionStorage.getItem("__username__")=='host'&&<select name="sort" id="sort" className="sort">
                        <option value="js">JavaScript</option>
                        <option value="react">react</option>
                        <option value="algorithm">算法</option>
                        <option value="http">http</option>
                        <option value="life">随笔</option>
                        <option value="visitor">游客留言</option>
                    </select>
                    }
                    <textarea spellCheck='false' rows="10" onChange={e=>this.setState({write:e.target.value})} value={this.state.write}></textarea>
                    <button className='send_btn' onClick={this.handleSend}>发布</button>
                </div>
                <div className='right'>
                    <div
                        className='right-article aritcle-desc article-content'
                        dangerouslySetInnerHTML={{ __html: marked(this.state.write) }}
                        style={{height:this.state.height}}
                    ></div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    let {article}=state||{article:{}};
    return {article}
};
export default connect(mapStateToProps)(Write)