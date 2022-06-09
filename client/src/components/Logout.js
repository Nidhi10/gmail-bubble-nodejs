import React, { useCallback, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout({onLogout}) {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    googleLogout();
    localStorage.removeItem('access_token')
    onLogout();
  }, [onLogout]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      axios.get('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res) => {
        console.log(res.data.emailAddress)
        navigate("/", {state: {email: res.data.emailAddress}})
      })
    } else {
      onLogout()
    }
  }, [onLogout])

  return (
      <li>
        <a onClick={logout} href="#">Logout</a>
      </li>
  )
}

export default Logout;
