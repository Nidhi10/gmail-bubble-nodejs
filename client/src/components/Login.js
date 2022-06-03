import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = "290777766-t5rp22ckjf5jtc9f3kh5tmteucn5t3bu.apps.googleusercontent.com"
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
  