import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../Header.css';
class Header extends Component {
  render() {
    return (
      <header>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/kids">Kids</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
