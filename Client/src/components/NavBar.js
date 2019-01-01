import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { ShowLocation, ShowHideHamburger } from '../utils/index';
import '../../public/styles/landingPageStyles.css';
import logo from '../../public/images/ffflogo.png';

export const HomePage = () => {
    return (
        <header>
            <nav>
                <div className="nav-bar">
                    <a href="/" className="site-name">
                        <img src={logo} alt="ffflogo" className="logo" /> <strong>Fast-Food-Fast</strong>
                    </a>
                    <a href="/Signup" className="order">Order a meal</a>
                    <a href="/Signup" className="history">History</a>
                    <button onClick={() => ShowLocation('https://fast-food-fast.herokuapp.com/Signin')} className="login centre">LOGIN</button>
    <a className="hamburger" onClick={()=> ShowHideHamburger()}>&#9776;</a>
                    <div className="tab-modal">
                        <div className="tab-modal-a">
                            <a href="/Signup">Order a meal</a>
                            <br />
                            <br />
                            <hr />
                            <br />
                            <a href="/Signup">History</a>
                            <br />
                            <br />
                            <hr />
                            <br />
                            <a href="/Signin">Login</a>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

class NavBar extends Component {

    render() {
        return (
            <Fragment>
                {this.props.View === 'homePage' && <HomePage />}
            </Fragment>
        );
    }
}

NavBar.propTypes = {
    View: PropTypes.string.isRequired
}

export default NavBar;