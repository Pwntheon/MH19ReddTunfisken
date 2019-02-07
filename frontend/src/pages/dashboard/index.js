import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Trashometer from './trashometer/trashometer';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 80
    };
  }
  render() {
    const { authentication } = this.props;

    if (!authentication.accessToken) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Trashometer temp={this.state.temp} />
        <input type="range" min="50" max="150" value={this.state.temp} onChange={e => this.setState({temp:e.target.value})}/>
      </>
    );
  }
}

export default Dashboard;
