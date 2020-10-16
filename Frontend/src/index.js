import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import store from './redux/store';
import { Provider } from 'react-redux';
import './style/style.css';
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);