import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../public/styles/signupStyles.css';
import logo from '../../public/images/ffflogo.png';
import { SignupAUser } from '../actions/index';
import { SimpleLoader } from './index';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      nameError: '',
      role: 'user',
      signupBtnClicked: false
    }
  }

  handleName(e) {
    this.setState({
      name: e.target.value,
      nameError: ''
    });
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
      this.handleSignup();
    }
  }

  handleSignup() {
    const { email, password, name } = this.state;

    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
      this.setState({
        emailError: 'Not a valid email address'
      });
    } else if (!password || password.length < 6) {
      this.setState({
        passwordError: 'Password must be 6 or more characters'
      });
    } else if (!name || name.length < 3) {
      this.setState({
        nameError: 'Name must be 3 characters or more'
      });
    } else {
      this.setState({
        signupBtnClicked: true
      });
      const { name, email, password, role } = this.state;
      const userData = {
        name,
        email,
        password,
        role
      }
      const { SignupAUser } = this.props;
      SignupAUser(userData);
    }
    
  }
  render() {
    const { signupBtnClicked, emailError, passwordError, nameError } = this.state;
    const { isAuthenticated, status, error } = this.props;

    if (isAuthenticated) {
      return <Redirect to='/orders' />
    }

    return (
      <Fragment>
        <Helmet>
          <title>
            Fast-Food-Fast | Sign Up
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
              <p>Sign up to order for food easily, no matter where you are</p>
            </div>
            <br />

            <form action="#" method="POST" className="form" onKeyUp={(e) => this.onClickButton(e)}>
              <input type="text" className="signupName" name="name" value={this.state.name} placeholder="Name" onChange={(e) => this.handleName(e)} />
              <span className={nameError && "feedback"}>{nameError}</span>
              <br /><br />
              <input type="email" className="signupEmail" name="email" value={this.state.email} placeholder="Email" onChange={(e) => this.handleEMail(e)} />
              <span className={emailError && "feedback"}>{emailError}</span>
              <br /><br />
              <input type="password" className="signupPassword" name="password" value={this.state.password} placeholder="Password" onChange={(e) => this.handlePassword(e)} />
              <span className={passwordError && "feedback"}>{passwordError}</span>
              <br /><br />
              <input type="hidden" className="signupRole" name="signupRole" value="user" />
            </form>
            <button className="signup" onClick={() => this.handleSignup()}><span className="signupText">{signupBtnClicked && status === 'LOADING' && !error ? <SimpleLoader fontSize={20} color={'white'} /> : 'Sign up'}</span></button>
            <div className="signup-properties">
              <p> Already have an account?
                <Link to="/Signin">&nbsp;Sign in</Link>
              </p>
            </div>
          </div>
        </div>

      </Fragment>
    );
  }
}

Signup.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string,
  act: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  SignupAUser: PropTypes.func
}

const mapStateToProps = state => ({
  status: state.signup.status,
  error: state.signup.error
});

export default connect(mapStateToProps, { SignupAUser })(Signup);
