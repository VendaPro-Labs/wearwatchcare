import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router, Route, Link} from 'react-router-dom';

import myhistory from './myhistory';
//import { useHistory } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './redux/store';




// const history = useHistory();

ReactDOM.render(
  <Provider store ={store}>
  <React.StrictMode>
    <Router history = {myhistory}>
        <App />
    </Router>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
