import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import Main from "./Main";

const client_id = "290777766-t5rp22ckjf5jtc9f3kh5tmteucn5t3bu.apps.googleusercontent.com"
const root =  ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      <Main/>
    </GoogleOAuthProvider> 
  </React.StrictMode>
);

