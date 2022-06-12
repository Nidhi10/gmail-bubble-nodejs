import React, { useCallback, useState } from "react";
import {
  Route,
  NavLink,
  BrowserRouter,
  Routes
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Emails from "./components/Emails";

function Main() {
  const [isSignedIn, setSignedIn] = useState(false)

  const handleLogin = useCallback(() => {
    setSignedIn(true)
  }, [])

  const handleLogout = useCallback(() => {
    setSignedIn(false)
  }, [])

  return (
    <BrowserRouter>
      <div>
        <h1>Gmail Bubble</h1>
        <ul className="header">
          <li><NavLink to="/">Home</NavLink></li>
          {isSignedIn ? <Logout onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
        </ul>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/emails" element={<Emails />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Main;