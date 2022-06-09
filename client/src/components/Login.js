import React from 'react';
import {useGoogleLogin } from '@react-oauth/google';

function Login({onLogin}) {
  const login =  useGoogleLogin({
    onSuccess: ({access_token}) => {
      localStorage.setItem('access_token', access_token)
      onLogin()
    },
    scope: 'https://mail.google.com/'
  })

  return (
  <li>
    <a onClick={login} href="#">Login</a>
  </li>)
  }
  
  export default Login;
  