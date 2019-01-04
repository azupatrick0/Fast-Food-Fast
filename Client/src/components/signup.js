import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../public/styles/signupStyles.css';
import logo from '../../public/images/ffflogo.png';
import { CloseModal, ValidateUserDetails, ClearFeedback } from '../utils/index';

import SignupAUser from '../actions/index';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            role: 'user'
        }
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
        return (
            <Fragment>

                { this.props.status === 'SUCCESS' && <Redirect to='/Dashboard' /> }
        
                <Helmet>
                    <title>
                        Fast-Food-Fast | Sign Up
                        </title>
                    <link rel="shortcut icon" type="image/png" href='../../public/images/ffflogo.png' />
                </Helmet>
                <div className="modal">
                    <p>{this.props.error}</p><br />
                    <button className="accept-btn" onClick={()=> CloseModal('.modal')}>Ok</button>
                </div>
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
                            <input type="text" className="signupName" name="name" value={this.state.name} placeholder="Name" onInput={() => ClearFeedback('.feedback3')} onChange={(e) => this.onHandleFormChange(e)} />
                            <span className="feedback3"></span>
                            <br /><br />
                            <input type="email" className="signupEmail" name="email" value={this.state.email} placeholder="Email" onInput={() => ClearFeedback('.feedback')} onChange={(e) => this.onHandleFormChange(e)} />
                            <span className="feedback"></span>
                            <span className="feedback feedback5"></span>
                            <br /><br />
                            <input type="password" className="signupPassword" name="password" value={this.state.password} placeholder="Password" onInput={() => ClearFeedback('.feedback2')} onChange={(e) => this.onHandleFormChange(e)} />
                            <span className="feedback2"></span>
                            <br /><br />
                            <input type="hidden" className="signupRole" name="signupRole" value="user" />
                        </form>
                        <button className="signup" onClick={() => ValidateUserDetails(this.onHandleSignup())}><span className="signupText">Sign Up</span> <span className="spinner"></span></button>
                        <span className="modal">{this.props.error}</span>
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
    act: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    status: state.status,
    error: state.error
});

const mapDispatchToProps = (dispatch) => ({
    act: (action) => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
