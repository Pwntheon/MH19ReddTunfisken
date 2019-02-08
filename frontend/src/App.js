import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Api from './api/api';

class App extends Component {
  state = {
    authentication: {},
    household: {}
  };

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.getHousehold = this.getHousehold.bind(this);
    this.createHousehold = this.createHousehold.bind(this);
  }

  login(response) {
    this.setState({ authentication: response });
  }

  async getHousehold() {
    const { accessToken } = this.state.authentication;
    if (!accessToken) return;

    const response = await Api.getHousehold(accessToken);

    if (response.status !== 200) {
      return;
    }
    const data = await response.json();
    this.setState({
      household: data
    });
    console.log(data);
    console.log(this.state);
    // If authenticated do a get /me. If unsuccesful redirect to register.
    // If successfull, set house hold state.
  }

  async createHousehold(household) {
    const { accessToken } = this.state.authentication;
    if (!accessToken) return;

    const response = await Api.createHousehold(household, accessToken);
    if (response.status !== 201) {
      console.error('something went wrong');
      console.log(response);
    }
    const data = await response.json();

    console.log(data);
    this.setState({
      household: data
    });
    console.log(data);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.authentication.accessToken !==
      prevState.authentication.accessToken
    ) {
      this.getHousehold();
    }
  }

  render() {
    const { authentication, household } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header authentication={authentication} />
            <Main
              authentication={authentication}
              household={household}
              loginCallback={this.login}
              createHousehold={this.createHousehold}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
