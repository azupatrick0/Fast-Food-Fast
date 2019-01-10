import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../public/styles/signupStyles.css';
import logo from '../../public/images/ffflogo.png';
import { ValidateUserDetails } from '../../js/utils/index';
import { SignupAUser } from '../actions/index';

export class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            role: 'user'
        }
        this.feedback4 = React.createRef();
    }

    onHandleFormChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClickButton(e) {
        // Number 13 is the "Enter" key on the keyboard
        if (e.keyCode === 13) {
            ValidateUserDetails();
        }
    }

    onHandleSignup() {
        const { name, email, password, role } = this.state;
        const userData = {
            name,
            email,
            password,
            role
        }
        this.props.act(SignupAUser(userData));
        
    }
    render() {
        if(this.props.status === 'FAILED' || this.props.status === 'ERROR') {
            this.feedback4.current.style.display = 'block';
        }
        return (
            <Fragment>
                
                {this.props.status === 'SUCCESS' && <Redirect to='/Orders' />}
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
                            <input type="text" className="signupName" name="name" value={this.state.name} placeholder="Name"  onChange={(e) => this.onHandleFormChange(e)} />
                            <span className="feedback3"></span>
                            <br /><br />
                            <input type="email" className="signupEmail" name="email" value={this.state.email} placeholder="Email"  onChange={(e) => this.onHandleFormChange(e)} />
                            <span className="feedback"></span>
                            <span className="feedback feedback5"></span>
                            <br /><br />
                            <input type="password" className="signupPassword" name="password" value={this.state.password} placeholder="Password"  onChange={(e) => this.onHandleFormChange(e)} />
                            <span className="feedback2"></span>
                            <br /><br />
                            <input type="hidden" className="signupRole" name="signupRole" value="user" />
                        </form>
                        <button className="signup" onClick={() => ValidateUserDetails(this.onHandleSignup())}><span className="signupText" ref={this.signupText}>Sign Up</span> <span className="spinner" ref={this.spinner}></span></button>
                        <span className="feedback4" ref={this.feedback4}>{this.props.error}</span>
                        <div className="signup-properties">
                            <p> Already have an account?
                        <a href="https://fast-food-fast.herokuapp.com/Signin">Sign in</a>
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
    act: PropTypes.func
}

const mapStateToProps = state => ({
    status: state.signup.status,
    error: state.signup.error
});

const mapDispatchToProps = (dispatch) => ({
    act: (action) => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
