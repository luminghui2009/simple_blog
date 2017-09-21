import React from 'react';
import './index.less';
export default class Login extends React.Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:''
        }
    }
    username=(e)=>{
        this.setState({...this.state,username:e.target.value});
    };
    password=(e)=>{
        this.setState({...this.state,password:e.target.value});
    };
    handleLogin=()=>{
        console.log(this.state);
        const url="http://localhost:3000";
        fetch(url+'/login',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:this.state.username,
                password:this.state.password
            }),
            mode: 'cors'
        }).then(res=>res.json()).then(data=>{
            if(data.status===1){
                sessionStorage.setItem('__token__',data.token);
                sessionStorage.setItem('__username__',data.username);
                this.props.history.push('/');
            }else{
                console.log(data);
            }
        });
    };
    render(){
        return(
            <div className="login">
                <h3>登录</h3>
                <div className="login_prepend">
                    <input type="text" className="username" placeholder="用户名" onChange={this.username}/>
                </div>
                <div className="login_prepend">
                    <input type="password" className="password" placeholder="密码" onChange={this.password}/>
                </div>
                <button className="login_btn" onClick={this.handleLogin}>确定</button>
            </div>
        )
    }
}