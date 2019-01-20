import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ShowLocation, ShowHideHamburger } from '../../js/utils/index';
import logo from '../../public/images/ffflogo.png';

class NavBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        logOut: false
      }
    }
    onLogout() {
      window.localStorage.clear();
      this.setState({
        logOut: true
      })
    }
  
    render() {
      return (
        <Fragment>
          {this.state.logOut === true && <Redirect to='/' />}
          <header>
            <nav>
              <div className="nav-bar">
                <a href={this.props.link0} className="site-name">
                  <img src={logo} alt="ffflogo" className="logo" /> <strong>Fast-Food-Fast</strong>
                </a>
                <a href={this.props.link1} className="order">{this.props.anchor1Body}</a>
                <a onClick={() => this.onLogout()} className="history">{this.props.anchor2Body}</a>
                <button onClick={() => ShowLocation(this.props.link2)} className="signout">{this.props.buttonBody}</button>
                <a className="hamburger" onClick={() => ShowHideHamburger('.tab-modal')}>&#9776;</a>
                <div className="tab-modal">
                  <div className="tab-modal-link">
                    <a href={this.props.link1}>{this.props.anchor3Body}</a>
                    <br />
                    <br />
                    <hr />
                    <br />
                    <a href={this.props.link2}>{this.props.anchor4Body}</a>
                    <br />
                    <br />
                    <hr />
                    <br />
                    <a onClick={() => this.onLogout()} className="signout-navbar">{this.props.anchor5Body}</a>
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
}

export default NavBar;