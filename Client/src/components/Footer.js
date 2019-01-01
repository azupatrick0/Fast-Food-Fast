import React, { Fragment, Component } from 'react';
import { ScrollToTop } from '../utils/index';
import '../../public/styles/landingPageStyles.css';

class Footer extends Component {

    render() {
        return (
            <Fragment>
                <footer>
                    <strong>&copy; 2018 Fast-Food-Fast.</strong><a className="up-arrow" onClick={()=> ScrollToTop()}>&#11014;</a>
                </footer>
            </Fragment>
        );
    }
}

export default Footer;