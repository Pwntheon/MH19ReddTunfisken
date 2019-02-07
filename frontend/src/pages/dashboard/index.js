import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MyTrashStatus from './mytrashstatus/mytrashstatus';
class Dashboard extends Component {
  render() {
    const { authentication } = this.props;

    if (!authentication.accessToken) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <MyTrashStatus />
      </>
    );
  }
}

export default Dashboard;
