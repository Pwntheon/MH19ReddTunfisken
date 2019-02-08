import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './BottomMenu.css';
class BottomMenu extends Component {
  state = {
    redirect: {
      to: ''
    }
  };
  constructor() {
    super();

    this.onClickWhatWhere = this.onClickWhatWhere.bind(this);
  }

  onClickWhatWhere() {
    console.log('Clicked');
    this.setState({
      redirect: {
        to: '/what-where'
      }
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect && redirect.to) {
      return <Redirect to={redirect.to} />;
    }
    return (
      <div className="bottom-menu">
        <span>Barn</span>
        <span>Matsvinn</span>
        <span className="last" onClick={this.onClickWhatWhere}>
          Hva skal hvor
        </span>
      </div>
    );
  }
}

export default BottomMenu;
