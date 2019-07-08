import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
/*import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';*/
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
//import authReducer from './store/reducers/reducer';
//import toggleReducer from './store/reducers/reducerToggle';
//import { loadState, saveState } from './localStorage';
//import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import './index.css';
require('dotenv').config()



const app = (
    <BrowserRouter>
        
            <App />
        
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
