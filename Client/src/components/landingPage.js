import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Footer, NavBar } from './index';
import '../../public/styles/landingPageStyles.css';
import placeorder from '../../public/images/place-order.png';
import money from '../../public/images/money.png';
import fruit from '../../public/images/fruit.png';
import food1 from '../../public/images/food1.jpg';
import food2 from '../../public/images/food2.png';
import food3 from '../../public/images/food3.png';

export const Slide0 = () => {
    return (
        <div className="slide0">
            <div className="blur"></div>
            <p>
                Fast-Food-Fast​ is a food delivery service app<br /> for a restaurant<br />
                <span className="sub-description">Order for your <span className="sub-description2">DELICIOUS MEALS</span> from the
                comfort of your home</span>
            </p>
            <br />
            <br />
            <Link to='/Signup'><button className="get-started middle">
                Get Started
            </button>
            </Link>
        </div>
    );
}

export const Slide1 = () => {
    return (
        <div className="slide1">
            <br/>
                <div className="centre"><strong>How it Works</strong></div><br/>
                <div className="grid">
                    <div className="grid-items">
                        <img src={placeorder} alt="place-order" /><br />
                        <span className="card"><strong>Place your order</strong></span><br />
                        <span className="text-small"><p>Are you hungry? You dont have the time to go to a restaurant? Are you busy? With Fast-Food-Fast you can place your food order online, and
                        receive it wherever you wish.</p></span>
                    </div>
                    <div className="grid-items">
                        <img src={money} alt="money" /><br />
                        <span className="card"><strong>Pay on Delivery</strong></span><br />
                        <span className="text-small"><p>
                            With many people still skeptical about using their debit cards online to purchase items, Fast-Food-Fast removes the barrier, enabling you to pay on delivery, no debit card? no
                        problem.</p></span>
                    </div>
                    <div className="grid-items">
                        <img src={fruit} alt="fruit" /><br />
                        <span className="card"><strong>Enjoy your meal</strong></span><br />
                        <span className="text-small"><p>Using one of the fastest method of delivery, we ensure that your meal gets to your doorstep, you can now enjoy your meal.</p></span>
                    </div>
                </div>
                <br />
                <Link to='/Signup'><button className="get-started middle">
                    Get Started
                </button>
                </Link>
        </div>
    );
}

export const Slide2 = () => {
    return (
        <div className="slide2">
                <div className="centre"><strong>Our Popular Meals</strong></div><br />
                <div className="grid">
                    <div className="grid-items">
                        <img src={food1} alt="place-order" className="img-big" />
                        <div className="card"><strong>Fruttie</strong>
                            <p>Enjoy one of our delicious meal, <strong>Fruttie</strong> is for vegetarians who likes
                                eating healthy meals, with an array of vegetables and fruits mixed together.
                        </p>
                        <Link to='/Signup'><div className="grid">&#8358;400<button className="card-btn">ORDER
                                    NOW
                            </button></div></Link>
                        </div>
                    </div><span className="show-break"><br /><br /></span>
                    <div className="grid-items">
                        <img src={food2} alt="money" className="img-big" /><br />
                        <div className="card"><strong>Burger</strong>
                            <p>Enjoy one of our delicious meal, <strong>Burger</strong> is for people who likes to enjoy.
                                With
                                sandwich-like packaging, you get it all in one, burger and sandwich alike.
                        </p>
                        <Link to='Signup'><div className="grid">&#8358;200<button className="card-btn">ORDER
                                    NOW
                            </button></div></Link>
                        </div>
                    </div><span className="show-break"><br /><br /></span>
                    <div className="grid-items">
                        <img src={food3} alt="fruit" className="img-big" /><br />
                        <div className="card"><strong>Veggie</strong>
                            <p>Enjoy one of our delicious meal, <strong>Veggie</strong> is for vegetarians who likes eating
                                healthy
                                and also enjoying while they are on it. Order it now.
                        </p>
                        <Link to='Signup'><div className="grid">&#8358;350<button className="card-btn">ORDER
                                    NOW
                            </button></div></Link>
                        </div>
                    </div>
                </div>
        </div>
    );
}


class LandingPage extends Component {
    render() {
        return (
            <Fragment>

                <Helmet>
                    <title>Fast-Food-Fast | A food delivery service app for a restaurant</title>
                    <link rel="shortcut icon" type="image/png" href='../../public/images/ffflogo.png' />
                </Helmet>

                <NavBar
                    link0={'/'}
                    link1={''}
                    link2={'/Signin'}
                    buttonBody={'LOGIN'}
                    anchor3Body={'Order a meal'}
                    anchor4Body={'Login'}
                />

                <Slide0 />

                <Slide1 />

                <Slide2 />

                <Footer />

            </Fragment>
        );
    }
}

export default LandingPage;
