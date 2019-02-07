import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  state = {
    authentication: {}
  };

  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  login(response) {
    this.setState({ authentication: response });
  }

  render() {
    const { authentication } = this.state;
    console.log(authentication);
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header authentication={authentication} />
            <Main authentication={authentication} loginCallback={this.login} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
