import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../Header.css';

const SvgComponent = props => (
  <svg
    id="prefix__Layer_1"
    data-name="Layer 1"
    viewBox="0 0 309.03 81.89"
    {...props}
  >
    <defs>
      <style>
        {'.prefix__cls-1{fill:#d9e2e4}.prefix__cls-2{fill:#95c11f}'}
      </style>
    </defs>
    <title>{'Logo_1'}</title>
    <path
      className="prefix__cls-1"
      d="M191.44 76.23h-16.07V112.45a15.43 15.43 0 0 1-.86 5.42c-1.73 4.49-5.38 6.33-10 6.54-5.21.23-9.67-2.68-11-7.4a16.45 16.45 0 0 1-.54-4.43V76.2h-16.23v35.67a33.15 33.15 0 0 0 .45 5.63c1.35 7.72 5.18 13.84 12 17.88 6.39 3.77 13.32 4.49 20.52 3.36a25.71 25.71 0 0 0 21.68-24.63c.2-12.39.08-24.79.1-37.19a5.94 5.94 0 0 0-.05-.69zM110.51 90.3c4.79 1 8.27 3.86 11 7.73l.11.16 10.81-10.79a28.1 28.1 0 0 0-5.84-5.89c-9.24-6.85-19.55-8.16-30.3-4.91-20.36 6.17-28.29 27.8-19.64 44.88 8.9 17.55 30.44 21.8 45.32 14.23a29.35 29.35 0 0 0 9.79-8L121 117c-3.43 4.49-7.87 7.3-13.9 7.43-5.34.11-10-1.55-13.47-5.73-3.3-3.92-4.15-8.55-3.73-13.53.94-10.9 10.23-16.96 20.61-14.87zM199.17 76.67v14.59h18.52v41.45l.27-.35 7.94-10.46 7.95-10.48V91.18h18.5V76.67z"
      transform="translate(-73.18 -74.9)"
    />
    <path
      className="prefix__cls-2"
      d="M265.24 103.38v18.52H241.8l-21.28 16.16h44.8v18.5h14.5v-53.18zM279.81 92.28v-16h-15.07v16h15.07zM289.87 104.8H294a6.14 6.14 0 0 1 2.31.28 3.46 3.46 0 0 1 2.2 3.46 3.63 3.63 0 0 1-1.78 3.25 7.62 7.62 0 0 1 .45.71l2.31 4.16h-3.24l-2.12-4h-1.36v4h-2.91zm4.17 5.39a1.37 1.37 0 0 0 1.52-1.47c0-.89-.34-1.43-1.8-1.43h-1v2.9zM302.21 104.8h7.45v2.49h-4.54v2.17h3.62V112h-3.62v2.25h4.77v2.49h-7.68zM313 104.8h4.23c3.74 0 6.13 2.18 6.13 5.92s-2.39 6-6.13 6H313zm4.11 9.4c2 0 3.24-1.2 3.24-3.48s-1.28-3.43-3.24-3.43h-1.2v6.91zM326.22 104.8h2.91v7.52a2.07 2.07 0 0 0 4.12 0v-7.52h2.91v7.52c0 2.68-2 4.57-5 4.57s-5-1.89-5-4.57zM345.21 104.6a6.18 6.18 0 0 1 4.45 1.68l-1.34 2.2a5 5 0 0 0-3-1.22 3.21 3.21 0 0 0-3.36 3.39 3.38 3.38 0 0 0 3.36 3.58 4.87 4.87 0 0 0 3.16-1.46l1.5 2.13a6.53 6.53 0 0 1-4.79 2 6 6 0 0 1-6.24-6.17 6 6 0 0 1 6.26-6.13zM352.75 104.8h7.46v2.49h-4.55v2.17h3.63V112h-3.63v2.25h4.78v2.49h-7.69zM363.93 105.05h.71v11.64h-.71zM371.91 105.71h-4.34v-.66H377v.66h-4.35v11h-.71zM290 124.84h3.81a5.41 5.41 0 0 1 2.38.33 3.33 3.33 0 0 1 1.93 3.22 3.4 3.4 0 0 1-2 3.23 2.52 2.52 0 0 1 .4.58l2.43 4.4h-2.4l-2.34-4.4h-2.07v4.4H290zm4.07 5.53a1.72 1.72 0 0 0 1.87-1.86c0-1.13-.49-1.83-2.17-1.83h-1.63v3.69zM301.91 124.84H309v1.84h-4.93v3.1h4v1.84h-4v3.18h5.19v1.84h-7.33zM312.3 124.84h2.14v7.56a2.62 2.62 0 0 0 5.24 0v-7.55h2.15v7.56c0 2.65-1.91 4.44-4.76 4.44s-4.77-1.79-4.77-4.44zM325.92 133.62a4.74 4.74 0 0 0 2.94 1.24c.9 0 1.72-.46 1.72-1.43 0-2.11-5.58-1.74-5.58-5.37 0-2 1.7-3.42 4-3.42a5 5 0 0 1 3.53 1.26l-.93 1.75a4.31 4.31 0 0 0-2.61-1c-1 0-1.78.58-1.78 1.41 0 2.09 5.55 1.58 5.55 5.35 0 1.88-1.43 3.46-3.89 3.46a5.74 5.74 0 0 1-4.08-1.61zM335.86 124.84h7.07v1.84H338v3.1h4v1.84h-4v3.18h5.18v1.84h-7.33zM346.72 125h.71v11.64h-.71zM354.7 125.67h-4.34V125h9.4v.67h-4.35v11h-.71zM290.07 144.86h3.59a5.93 5.93 0 0 1 2.2.26 3.48 3.48 0 0 1-.14 6.35 2.92 2.92 0 0 1 .35.53l2.5 4.56h-1.87l-2.47-4.68h-2.52v4.68h-1.64zm4 5.63a2 2 0 0 0 2.08-2.13 1.92 1.92 0 0 0-.94-1.81 3.28 3.28 0 0 0-1.61-.26h-1.9v4.2zM301.72 144.86h6.82v1.43h-5.17V150h4.21v1.43h-4.21v3.78h5.46v1.43h-7.11zM317.34 144.66a6 6 0 0 1 4.27 1.54l-.81 1.23a5.38 5.38 0 0 0-3.39-1.28 4.28 4.28 0 0 0-4.35 4.49 4.41 4.41 0 0 0 4.36 4.64 5.34 5.34 0 0 0 3.63-1.53l.88 1.18a6.28 6.28 0 0 1-4.56 1.87 6.07 6.07 0 0 1 0-12.14zM327.65 151.62l-3.94-6.76h1.86l2.18 3.85c.36.65.71 1.48.71 1.48s.35-.81.71-1.48l2.15-3.85h1.86l-3.93 6.76v5h-1.64zM340.83 144.66a6.07 6.07 0 0 1 4.28 1.54l-.82 1.23a5.34 5.34 0 0 0-3.39-1.28 4.27 4.27 0 0 0-4.34 4.49 4.41 4.41 0 0 0 4.36 4.64 5.3 5.3 0 0 0 3.62-1.53l.88 1.18a6.27 6.27 0 0 1-4.55 1.87 5.92 5.92 0 0 1-6-6.14 5.86 5.86 0 0 1 5.96-6zM348.66 144.86h1.65v10.31h5.26v1.43h-6.91zM358.46 144.86h6.82v1.43h-5.18V150h4.21v1.43h-4.21v3.78h5.46v1.43h-7.1zM369.18 145h.72v11.6h-.72zM377.16 145.62h-4.34V145h9.4v.67h-4.34v11h-.72z"
      transform="translate(-73.18 -74.9)"
    />
  </svg>
);

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <SvgComponent />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/">Hjem</Link>
              <Link to="/dashboard">Dashbord</Link>
              <Link to="/kids">For Barn</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
