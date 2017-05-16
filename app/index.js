import React from 'react';
import { render } from 'react-dom';

import App from './App.jsx';

const root = document.querySelector('#root');

render(
  <div>
    <App/>
  </div>,
  root,
);
