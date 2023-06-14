import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './redux/store/index'
import {BrowserRouter} from 'react-router-dom'
import {Auth0Provider} from "@auth0/auth0-react"
// const {REACT_APP_AUTH0_DOMAIN,REACT_APP_AUTH0_CLIENT_ID} = process.env;

// console.log(REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID)

const domain = 'dev-15jh03ernoncz4og.us.auth0.com'
const clientId = 'DiZZVkOdfpGyI9HdcA3PJSCEYDjSDQqV'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin + '/home'}>
        <App />   
      </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
