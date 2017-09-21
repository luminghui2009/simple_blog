import React from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import Index from "./subPage/Index/index";
import Login from "../../components/Login/index";
import Register from "../../components/Register/index";
import Write from "../../components/Write/index";
export default class Home extends React.Component{
    render(){
        return(
            <Router >
                <Switch>
                    <Route exact path={"/"} component={Index}/>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/register"} component={Register}/>
                    <Route path={"/write/new"} component={Write}/>
                </Switch>
            </Router>
        )
    }
}