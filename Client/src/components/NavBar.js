import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { ShowLocation, ShowHideHamburger } from '../../js/utils/index';
import '../../public/styles/landingPageStyles.css';
import logo from '../../public/images/ffflogo.png';

export const HomePage = () => {
    return (
        <header>
            <nav>
                <div className="nav-bar">
                    <a href="https://fast-food-fast.herokuapp.com/" className="site-name">
                        <img src={logo} alt="ffflogo" className="logo" /> <strong>Fast-Food-Fast</strong>
                    </a>
                    <a href="https://fast-food-fast.herokuapp.com/Signup" className="order">Order a meal</a>
                    <a href="https://fast-food-fast.herokuapp.com/Signup" className="history">History</a>
                    <button onClick={() => ShowLocation('https://fast-food-fast.herokuapp.com/Signin')} className="login centre">LOGIN</button>
    <a className="hamburger" onClick={()=> ShowHideHamburger('.tab-modal')}>&#9776;</a>
                    <div className="tab-modal">
                        <div className="tab-modal-a">
                            <a href="https://fast-food-fast.herokuapp.com/Signup">Order a meal</a>
                            <br />
                            <br />
                            <hr />
                            <br />
                            <a href="https://fast-food-fast.herokuapp.com/Signup">History</a>
                            <br />
                            <br />
                            <hr />
                            <br />
                            <a href="https://fast-food-fast.herokuapp.com/Signin">Login</a>
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