import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Reducers} from './reducers';

const store = createStore(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>
,document.getElementById('app')
);