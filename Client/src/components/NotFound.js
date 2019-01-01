import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import '../../public/styles/signinStyles.css';
import logo from '../../public/images/ffflogo.png';

class NotFound extends Component {

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Fast-Food-Fast | 404 Not Found</title>
                    <link rel="shortcut icon" type="image/png" href='../../public/images/ffflogo.png' />
                </Helmet>
                <div className="slide-signin flex">
                    <div className="app-description">
                        <a href="/">
                            <img src={logo} alt="ffflogo" className="logo" /><strong>Fast-Food-Fast</strong>
                        </a>
                        <br />
                        <br /> 404 (Page not found)
                    </div>

                    <div className="signin-box">
                        <div className="signin-properties">
                            <p>Sorry the page you are looking for does not exist or it might have been removed.
                                Please click <a href="/">here</a> to go back to home page
                            </p>
                        </div>
                        <br />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default NotFound;
