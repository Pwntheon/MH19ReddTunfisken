import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Router from 'next/router';
import { connect } from 'react-redux';
import { login } from '../../store';
import css from '../../styles.less';

class Login extends Component {
  render() {
    const authCallback = response => {
      const { dispatch } = this.props;
      dispatch(login(response));
      Router.push('/index');
    };

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

export default connect()(Login);
