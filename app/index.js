import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './store/reducers/index';
import App from './App.jsx';

const root = document.querySelector('#root');
const middleware = applyMiddleware(promiseMiddleware(), loggerMiddleware);
const store = createStore(reducers, middleware);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  root,
);
