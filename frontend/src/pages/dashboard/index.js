import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterHousehold from '../../components/RegisterHousehold';
import MyTrashStatus from './mytrashstatus/mytrashstatus';
import BottomMenu from '../../components/BottomMenu';
class Dashboard extends Component {
  render() {
    const { authentication, household, createHousehold } = this.props;

    if (!authentication.accessToken) {
      return <Redirect to="/login" />;
    }

    if (!household || !household.householdId) {
      return (
        <RegisterHousehold
          authentication={authentication}
          createHousehold={createHousehold}
        />
      );
    }

    return (
      <div>
        <MyTrashStatus authentication={authentication} household={household} />
        <BottomMenu />
      </div>
    );
  }
}

export default Dashboard;
