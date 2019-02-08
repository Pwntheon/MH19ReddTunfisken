import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Redirect } from 'react-router-dom';
class Login extends Component {
  state = {
    redirectToHome: false
  };

  render() {
    const authCallback = response => {
      this.props.onLogin(response);
      this.setState({ redirectToHome: true });
    };
    const { redirectToHome } = this.state;

    if (redirectToHome) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Jumbotron>
        <h1>Logg inn!</h1>
        <p>Logg inn via Facebook for å bli med da vel :)</p>
        <FacebookLogin
          appId="574897169694887"
          autoLoad={true}
          fields="name,email,picture"
          callback={response => authCallback(response)}
        />
      </Jumbotron>
    );
  }
}

export default Login;
