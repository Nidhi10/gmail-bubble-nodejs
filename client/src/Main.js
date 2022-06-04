import React from "react";
import {
    Route,
    NavLink,
    BrowserRouter,
    Routes
  } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
 


class Main extends React.Component {
  render() {
    return (
        <BrowserRouter>
            <div>
              <h1>Gmail Bubble</h1>
              <ul className="header">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/login">Login to Gmail</NavLink></li>
                <li><NavLink to="/logout">Logout</NavLink></li>
              </ul>
              <div className="content">
                <Routes>
                  <Route exact path="/" element={<Home />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/logout" element={<Logout />}/>
                </Routes>
              </div>
            </div>
        </BrowserRouter>
    );
  }
}
 
export default Main;