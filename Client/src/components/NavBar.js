import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ShowLocation, ShowHideHamburger } from '../../js/utils/index';
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
                    <a className="hamburger" onClick={() => ShowHideHamburger('.tab-modal')}>&#9776;</a>
                    <div className="tab-modal">
                        <div className="tab-modal-link">
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


export class HistoryPage extends Component {
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
                            <a href="https://fast-food-fast.herokuapp.com/Orders" className="site-name">
                                <img src={logo} alt="ffflogo" className="logo" /> <strong>Fast-Food-Fast</strong>
                            </a>
                            <a href="https://fast-food-fast.herokuapp.com/Orders" className="order">Order a meal</a>
                            <a onClick={() => this.onLogout()} className="history">Sign Out</a>
                            <button onClick={() => ShowLocation('https://fast-food-fast.herokuapp.com/History')} className="signout">HISTORY</button>
                            <a className="hamburger" onClick={() => ShowHideHamburger('.tab-modal')}>&#9776;</a>
                            <div className="tab-modal">
                                <div className="tab-modal-link">
                                    <a href="https://fast-food-fast.herokuapp.com/Orders">Order a meal</a>
                                    <br />
                                    <br />
                                    <hr />
                                    <br />
                                    <a href="https://fast-food-fast.herokuapp.com/History">History</a>
                                    <br />
                                    <br />
                                    <hr />
                                    <br />
                                    <a onClick={() => this.onLogout()}>Sign Out</a>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </nav>

                </header>
            </Fragment>
        )

    }
}

export class OrdersPage extends Component {
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
                            <a href="https://fast-food-fast.herokuapp.com/Orders" className="site-name">
                                <img src={logo} alt="ffflogo" className="logo" /> <strong>Fast-Food-Fast</strong>
                            </a>
                            <a href="https://fast-food-fast.herokuapp.com/History" className="order">History</a>
                            <a onClick={() => this.onLogout()} className="history">Sign Out</a>
                            <button onClick={() => ShowLocation('https://fast-food-fast.herokuapp.com/Orders')} className="signout">ORDER</button>
                            <a className="hamburger" onClick={() => ShowHideHamburger('.tab-modal')}>&#9776;</a>
                            <div className="tab-modal">
                                <div className="tab-modal-link">
                                    <a href="https://fast-food-fast.herokuapp.com/Orders">Order a meal</a>
                                    <br />
                                    <br />
                                    <hr />
                                    <br />
                                    <a href="https://fast-food-fast.herokuapp.com/History">History</a>
                                    <br />
                                    <br />
                                    <hr />
                                    <br />
                                    <a onClick={() => this.onLogout()}>Sign Out</a>
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

class NavBar extends Component {

    render() {
        return (
            <Fragment>
                {this.props.View === 'homePage' ? <HomePage /> :
                    this.props.View === 'ordersPage' ? <OrdersPage /> :
                        this.props.View === 'historyPage' ? <HistoryPage /> : ''
                }
            </Fragment>
        );
    }
}

NavBar.propTypes = {
    View: PropTypes.string.isRequired
}

export default NavBar;