import React from "react";
import { useLocation } from "react-router-dom";
 
function Home(props) {
  const {state} = useLocation();
  const email = state && state.email
    return (
      <div>
        <h2>HELLO {email ? email: "User" }</h2>
        <p>View emails in a new way!</p>
      </div>
    );
}
 
export default Home;