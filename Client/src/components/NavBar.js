import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ShowHideHamburger } from '../../js/utils/index';
import logo from '../../public/images/ffflogo.png';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logOut: false
    }
  }

  onLogout() {
    const cart = localStorage.getItem('cart');
    localStorage.clear();
    localStorage.setItem('cart', cart);
    location.href = '/';
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <Fragment>
        <header>
          <nav>
            <div className="nav-bar">
              <Link to={this.props.link0} className="site-name">
                <img src={logo} alt="ffflogo" className="logo" /> <strong className="white">Fast-Food-Fast</strong>
              </Link>
              <Link to={this.props.link1} className="order">{this.props.anchor1Body}</Link>
              <a onClick={() => this.onLogout()} className="history">{this.props.anchor2Body}</a>
              <Link to={!isAuthenticated && this.props.link2}><button className="signout">{isAuthenticated ? `Welcome ${localStorage.getItem('name')}` : this.props.buttonBody}</button></Link>
              <a className="hamburger" onClick={() => ShowHideHamburger('.tab-modal')}>&#9776;</a>
              <div className="tab-modal">
                <div className="tab-modal-link">
                  <Link to={isAuthenticated ? '/orders' : 'signin'}>{this.props.anchor3Body}</Link>
                  <br />
                  <br />
                  <hr />
                  <br />
                  { !isAuthenticated && <Link to={this.props.link2}>{this.props.anchor4Body}</Link> }
                  <br />
                  <br />
                  <hr />
                  <br />
                  { isAuthenticated && <a onClick={() => this.onLogout()} className="signout-navbar">{this.props.anchor5Body}</a>}
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </nav>
        </header>
      </Fragment>
    );
  }

}

NavBar.propTypes = {
  link0: PropTypes.string,
  link1: PropTypes.string,
  link2: PropTypes.string,
  buttonBody: PropTypes.string,
  anchor1Body: PropTypes.string,
  anchor2Body: PropTypes.string,
  anchor3Body: PropTypes.string,
  anchor4Body: PropTypes.string,
  anchor5Body: PropTypes.string,
  isAuthenticated: PropTypes.bool
}

export default NavBar;