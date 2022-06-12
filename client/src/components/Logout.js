import React, { useCallback, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import {useNavigate } from 'react-router-dom';

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
      navigate("/emails")
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
