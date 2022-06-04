import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

class Login extends React.Component {
    
    constructor(props) {
      super(props);
      this.onSuccess = this.onSuccess.bind(this)
      this.onError = this.onError.bind(this)
    }

    onSuccess = (res) => {
        console.log("Login success: ",  res)
    };

    onError = (res) => {
        console.log("Login Failed: ", res)
    };

    render() {
      return (
        <div>
          <h1>kdsjowqjfojdowf</h1>
          <GoogleLogin
            onSuccess={this.onSuccess}
            onError={this.onError}
            useOneTap
          />
        </div>
      )
    };
  }
  
  export default Login;
  