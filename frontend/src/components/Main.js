import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Kids from '../pages/kids';
import Dashboard from '../pages/dashboard';

class Main extends Component {
  render() {
    const onLogin = this.props.loginCallback;
    const { authentication, household, createHousehold } = this.props;
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home authentication={authentication} />}
          />
          <Route
            exact
            path="/login"
            render={props => <Login onLogin={onLogin} />}
          />

          <Route
            exact
            path="/dashboard"
            render={props => (
              <Dashboard
                household={household}
                authentication={authentication}
                createHousehold={createHousehold}
              />
            )}
          />
          <Route
            exact
            path="/kids"
            render={props => <Kids authentication={authentication} />}
          />
        </Switch>
      </main>
    );
  }
}

export default Main;
