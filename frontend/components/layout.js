import React, { Component } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import redirect from '../lib/redirect';

class Layout extends Component {
  static getInitialProps(context) {
    const { auth } = this.props;

    if (!auth.isAuth) {
      redirect(context, '/login');
    }
  }

  render() {
    const { title = 'Cutit', children } = this.props;

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            crossOrigin="anonymous"
          />
        </Head>
        <header>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>
              <Link href="/index">
                <a>CutIt</a>
              </Link>{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link href="/index">
                  <a>Hjem</a>
                </Link>{' '}
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>{' '}
                <Link href="/kids">
                  <a>For barn</a>
                </Link>{' '}
                <Link href="/reduce">
                  <a>Reduser</a>
                </Link>{' '}
                <Link href="/reuse">
                  <a>Gjenbruk</a>
                </Link>{' '}
                <Link href="/stats">
                  <a>Statistikk</a>
                </Link>{' '}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>

        {children}

        <footer>{'I`m here to stay'}</footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(Layout);
