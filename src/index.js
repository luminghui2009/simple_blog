import React from 'react';
import {render} from 'react-dom';
import Home from "./containers/Home";
import store from './store';
import{ Provider } from 'react-redux';
import '../node_modules/nprogress/nprogress.css';

window._store=store;
render(
    <Provider store={store}>
        <Home/>
    </Provider>
    ,document.getElementById("root"));