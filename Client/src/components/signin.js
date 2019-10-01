import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../public/styles/signupStyles.css';
import logo from '../../public/images/ffflogo.png';
import { SigninAUser } from '../actions/index';
import { SimpleLoader } from './index';

export class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordError: '',
      emailError: '',
      signinBtnClicked: false
    }
  }

  handleEMail(e) {
    this.setState({
      email: e.target.value,
      emailError: ''
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
      passwordError: ''
    });
  }


  onClickButton(e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
      this.handleSignin();
    }
  }

  handleSignin() {
    const { email, password } = this.state;

    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
      this.setState({
        emailError: 'Not a valid email address'
      });
    } else if (!password) {
      this.setState({
        passwordError: 'Password cannot be empty'
      });
    } else {
      this.setState({
        signinBtnClicked: true
      });
      const { email, password } = this.state;
      const userData = {
        email,
        password,
      };
      const { SigninAUser } = this.props;
      SigninAUser(userData);
    }
  }
  render() {
    const { signinBtnClicked, emailError, passwordError } = this.state;
    const { isAuthenticated, error, status } = this.props;

    if (isAuthenticated) {
      return <Redirect to='/orders' />
    }

    return (
      <Fragment>
        <Helmet>
          <title>
            Fast-Food-Fast | Sign In
          </title>
          <link rel="shortcut icon" type="image/png" href='../../public/images/ffflogo.png' />
        </Helmet>
        <div className="slide-signup flex">
          <div className="app-description">
            <a href="https://fast-food-fast.herokuapp.com/">
              <img src={logo} alt="ffflogo" className="logo" /><strong>Fast-Food-Fast</strong>
            </a>
            <br />
            <br /> Fast-Food-Fast​ is a food delivery service app for a restaurant
          </div>

          <div className="signup-box">
            <div className="signup-properties">
              <p>Sign in to order for food easily, no matter where you are</p>
            </div>
            <br />

            <form action="#" method="POST" className="form" onKeyUp={(e) => this.onClickButton(e)}>
              <input type="email" className="signupEmail" name="email" value={this.state.email} placeholder="Email" onChange={(e) => this.handleEMail(e)} />
              <span className={emailError && "feedback"}>{emailError}</span>
              <br /><br />
              <input type="password" className="signupPassword" name="password" value={this.state.password} placeholder="Password" onChange={(e) => this.handlePassword(e)} />
              <span className={passwordError && "feedback"}>{passwordError}</span>
              <br /><br />
            </form>
            <button className="signup" onClick={() => this.handleSignin()}>{signinBtnClicked && status === 'LOADING' && !error ? <SimpleLoader fontSize={20} color={'white'} /> : 'Sign in'}</button>
            <div className="signup-properties">
              <p> Don't have an account?
                <Link to="/Signup">&nbsp;Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Signin.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string,
  role: PropTypes.string,
  act: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object,
  SigninAUser: PropTypes.func
}

const mapStateToProps = state => ({
  status: state.signin.status,
  error: state.signin.error,
  role: state.signin.role,
});

export default connect(mapStateToProps, { SigninAUser })(Signin);
