import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/Login';
import Logout from './components/Logout';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client_id = "290777766-t5rp22ckjf5jtc9f3kh5tmteucn5t3bu.apps.googleusercontent.com"

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      <Login />
      <Logout />
    </GoogleOAuthProvider>;
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
