import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterHousehold from '../../components/RegisterHousehold';
class Dashboard extends Component {
  render() {
    const { authentication, household, createHousehold } = this.props;

    if (!authentication.accessToken) {
      return <Redirect to="/login" />;
    }

    console.log(household);
    if (!household || !household.householdId) {
      return (
        <RegisterHousehold
          authentication={authentication}
          createHousehold={createHousehold}
        />
      );
    }

    console.log(authentication);
    console.log(household);
    return 'Dashboard';
  }
}

export default Dashboard;
