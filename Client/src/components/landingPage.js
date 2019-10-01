/* eslint-disable react/no-did-mount-set-state */
import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Footer, NavBar } from './index';
import '../../public/styles/landingPageStyles.css';
import placeorder from '../../public/images/place-order.png';
import money from '../../public/images/money.png';
import fruit from '../../public/images/fruit.png';

export const Slide0 = ({ isAuthenticated }) => {
  Slide0.propTypes = {
    isAuthenticated: PropTypes.bool
  };

  return (
    <div className="slide0-landing-page">
      <section className="blur-landing-page">
        <p>
          Fast-Food-Fast​ is a <span className="sub-description2">FOOD</span> delivery service app<br /> for a restaurant<br />
          <span className="sub-description">
            Order for your <span className="sub-description2">DELICIOUS MEALS</span> from the comfort of your
            home
				</span>
        </p>
        <br />
        <br />
        <Link to={isAuthenticated ? "/orders" : "/Signup"}>
          <button className="get-started middle">{isAuthenticated ? 'Order for a meal': 'Get Started'}</button>
        </Link>
      </section>
    </div>
  );
};

export const Slide1 = ({ isAuthenticated }) => {
  Slide1.propTypes = {
    isAuthenticated: PropTypes.bool
  };

  return (
    <div className="slide1-landing-page">
      <br />
      <div className="centre">
        <strong>How it Works</strong>
      </div>
      <br />
      <div className="grid">
        <div className="grid-items animated bounceInUp">
          <img src={placeorder} alt="place-order" />
          <br />
          <span className="card">
            <strong>Place your order</strong>
          </span>
          <br />
          <span className="text-small">
            <p>
              Are you hungry? You dont have the time to go to a restaurant? Are you busy? With
							Fast-Food-Fast you can place your food order online, and receive it wherever you wish.
						</p>
          </span>
        </div>
        <div className="grid-items animated bounceInUp">
          <img src={money} alt="money" />
          <br />
          <span className="card">
            <strong>Pay on Delivery</strong>
          </span>
          <br />
          <span className="text-small">
            <p>
              With many people still skeptical about using their debit cards online to purchase items,
							Fast-Food-Fast removes the barrier, enabling you to pay on delivery, no debit card? no
							problem.
						</p>
          </span>
        </div>
        <div className="grid-items animated bounceInUp">
          <img src={fruit} alt="fruit" />
          <br />
          <span className="card">
            <strong>Enjoy your meal</strong>
          </span>
          <br />
          <span className="text-small">
            <p>
              Using one of the fastest method of delivery, we ensure that your meal gets to your doorstep
              as quickly as possible, so that you can enjoy your meal.
						</p>
          </span>
        </div>
      </div>
      <br />
      <br />
      <br />

      <Link to={isAuthenticated ? "/orders" : "/Signup"}>
        <button className="get-started middle">{isAuthenticated ? 'Order for a meal': 'Get Started'}</button>
      </Link>
    </div>
  );
};

class LandingPage extends Component {

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Fragment>
        <Helmet>
          <title>Fast-Food-Fast | A food delivery service app for a restaurant</title>
          <link rel="shortcut icon" type="image/png" href="../../public/images/ffflogo.png" />
        </Helmet>

        <NavBar
          link0={'/'}
          link1={''}
          link2={'/Signin'}
          buttonBody={'LOGIN'}
          anchor3Body={'Order a meal'}
          anchor4Body={'Login'}
          anchor5Body={'Logout'}
          isAuthenticated={isAuthenticated}
        />

        <Slide0 isAuthenticated={isAuthenticated} />

        <Slide1 isAuthenticated={isAuthenticated} />

        <Footer />
      </Fragment>
    );
  }
}

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool
};

export default LandingPage;
