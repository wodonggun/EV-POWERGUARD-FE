import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './frame/main';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);
