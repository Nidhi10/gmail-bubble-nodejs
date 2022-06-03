import React from 'react';
import { googleLogout } from '@react-oauth/google';

class Logout extends React.Component {
    
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this)
    }

    onClick = (res) => {
      googleLogout();
      console.log("Logout success: ", res )
    };

    render() {
      return (
        <div>
        <button onclick={this.onClick()}>
          Signout
        </button>
        </div>
      )
    };
  }
  
  export default Logout;
  