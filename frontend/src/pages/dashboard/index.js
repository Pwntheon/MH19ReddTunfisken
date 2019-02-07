import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    const { authentication } = this.props;

    if (!authentication.accessToken) {
      return <Redirect to="/login" />;
    }
    console.log(authentication);
    return 'Dashboard';
  }
}

export default Dashboard;
