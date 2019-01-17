import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavBar } from '../components/index';
import '../../public/styles/orderStyles.css';
import debitCard from "../../public/images/debit_card.png";
import { GetMenu, MakeOrder } from '../actions/index';


const userid = window.localStorage.getItem('id');
const name = window.localStorage.getItem('name');
const cart = [];
const newCart = [];

export class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            ready: 0
        }
        this.modal = React.createRef();
        this.firstTable = React.createRef();
        this.spinner = React.createRef();
        this.secondTable = React.createRef();
        this.cart = React.createRef();
        this.toggleCart = React.createRef();
        this.feedback = React.createRef();
    }

    onPlus(val) {
        document.querySelector(`.td4-cart${val}`).innerHTML = +(document.querySelector(`.td4-cart${val}`).innerHTML) + 1;
        document.querySelector(`.td3-cart${val}`).innerHTML = +(document.querySelector(`.td3-meal${val}`).innerHTML) *
            document.querySelector(`.td4-cart${val}`).innerHTML;

        cart.push({
            menuid: val,
            meal: document.querySelector(`.td2-cart${val}`).innerHTML,
            imgurl: document.querySelector(`.img${val}`).getAttribute('src'),
            userid,
            name,
            quantity: document.querySelector(`.td4-cart${val}`).innerHTML,
            amount: document.querySelector(`.td3-cart${val}`).innerHTML,
        });
    }

    onMinus(val) {
        document.querySelector(`.td4-cart${val}`).innerHTML -= 1;
        document.querySelector(`.td3-cart${val}`).innerHTML -= +(document.querySelector(`.td3-meal${val}`).innerHTML);
    }


    onDelete(val) {
        document.querySelector('.first-table-body').removeChild(document.querySelector(`.tr-cart${val}`));
        document.querySelector(`.meal-button${val}`).removeAttribute('disabled');
    }

    shouldComponentUpdate() {
        if (this.state.ready === 1) {
            return false;
        }
        return true;
    }

    onReady() {
        this.setState({
            ready: 1 
         })
    }

    onOrderAMeal() {
        if (cart.length === 0) {
            console.log('cart cannot be empty');
            this.feedback.current.style.display = 'block';
        } else {
            cart.map((mealObject) => {
                Object.assign(mealObject, {
                    location: document.querySelector('.location').value,
                });
            })
            this.props.act(MakeOrder(cart));
        }
      document.querySelector('.spinner').style.display = 'block';
      window.location.href='https://fast-food-fast.herokuapp.com/history'
    }

    onShowCart() {
        if (this.cart.current.style.display === 'block') {
            this.cart.current.style.display = 'none';
            this.toggleCart.current.innerHTML = 'Show Cart';
        } else {
            this.cart.current.style.display = 'block';
            this.toggleCart.current.innerHTML = 'Hide Cart';
        }
    }

    onAddToCart(val) {
        this.setState({
            clicked: true
        });
        newCart.push(val);
        setTimeout(() => {
            cart.push({
                menuid: val,
                meal: document.querySelector(`.td2-cart${val}`).innerHTML,
                imgurl: document.querySelector(`.img${val}`).getAttribute('src'),
                userid,
                name,
                quantity: document.querySelector(`.td4-cart${val}`).innerHTML,
                amount: document.querySelector(`.td3-cart${val}`).innerHTML,
            });
            console.log('new cart state ===>', cart)
        }, 1000)
       
    }

    onClear() {
        this.firstTable.current.innerHTML = '';
        cart.length = 0;
    }

    componentDidMount() {
        this.props.act(GetMenu());
    }

    onDeliveryDate() {
        let day = new Date().getDate();
        day += 1;
        let month = new Date().getMonth();
        month += 1;
        const year = new Date().getFullYear();
        const date = `${day}/${month}/${year}`;
        return date;
    }

    render() {
        if (this.props.status === 'LOADING' || this.props.statusOrder === 'LOADING') {
            this.spinner.current.style.display = 'block';
        } else if (this.props.status === 'NOTLOADING' || this.props.statusOrder === 'NOTLOADING') {
            this.spinner.current.style.display = 'none';
        } else if (this.props.status === 'ERROR' || this.props.statusOrder === 'ERROR') {
            this.modal.current.style.display = 'block';
        }
        return (
            <Fragment>
                {this.props.status === 'FAILED' || this.props.statusOrder === 'FAILED' && <Redirect to='/signin' />}
                {this.props.statusOrder === 'SUCCESS' && <Redirect to='/history' />}

                <Helmet>
                    <title>
                        Fast-Food-Fast | Order a meal
                        </title>
                    <link rel="shortcut icon" type="image/png" href='../../public/images/ffflogo.png' />
                </Helmet>

                <NavBar View={'ordersPage'} />
                <div className="modal feedback" ref={this.feedback}>Cart cannot be empty <button onClick={() => this.feedback.current.style.display = 'none'}>Ok</button></div>
                <div className="modal" ref={this.modal}><p>{this.props.error || this.props.errorOrder}<br /><br />Click <a href='/orders'>Here</a></p></div>
                <div className="slide0">
                    <div className="blur"></div>
                    <br />
                    <br />
                    <br />
                    <span className="center"><strong>Make your order</strong></span><br /><br />
                    <button className="toggle-cart" ref={this.toggleCart} onClick={() => this.onShowCart()}>Show Cart</button><br /><br />
                    <div className="blur2">
                        <div className="flex">
                            <div className="flex-items cart" ref={this.cart} >
                                <p><strong>Cart</strong></p>
                                <table className="first-table" ref={this.firstTable}>
                                    {this.state.clicked === true &&
                                        <tbody className="first-table-body">
                                            {newCart.map((mealClass) => {
                                                { document.querySelector(`.meal-button${mealClass}`).disabled = true }
                                                const mealObject = this.props.data.find((mealObject) => {
                                                    return mealObject.id === Number(mealClass);
                                                })
                                                return (
                                                    <tr className={`tr-cart${mealObject.id}`} key={`tr-cart${mealObject.id}`} >
                                                        <td className={`td2-cart${mealObject.id}`}>
                                                            {mealObject.meal}
                                                        </td>
                                                        <td className={`td3-cart${mealObject.id}`}>
                                                            {mealObject.price}
                                                        </td>
                                                        <td className={`td4-cart${mealObject.id}`}>
                                                            {1}
                                                        </td>
                                                        <td className={`td5-cart${mealObject.id}`}>
                                                            <button className={`cart-add-button${mealObject.id}`} onClick={() => this.onPlus(`${mealObject.id}`)}>+</button>
                                                        </td>
                                                        <td className={`td6-cart${mealObject.id}`}>
                                                            <button className={`cart-subtract-button${mealObject.id}`} onClick={() => this.onMinus(`${mealObject.id}`)}>-</button>
                                                        </td>
                                                        <td className={`td7-cart${mealObject.id}`}>
                                                            <button className={`cart-delete-button${mealObject.id}`} onClick={() => this.onDelete(`${mealObject.id}`)}>x</button>
                                                        </td>
                                                        <td className={`td1-cart${mealObject.id}`}>
                                                            <img src={`${mealObject.imgurl}`} className={`img img${mealObject.id}`} hidden />
                                                        </td>

                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    }
                                </table>
                            </div>
                            <div className="spinner" ref={this.spinner}></div>
                            <div className="flex-items">
                                <p><strong>Delicious Meals</strong></p>
                                <table className="second-table" ref={this.secondTable}>
                                    {this.props.status === 'SUCCESS' &&
                                        <tbody>
                                            {this.props.data.map((mealObject) => {
                                                return (
                                                    <tr className={`tr-meal${mealObject.id}`} key={`tr-meal${mealObject.id}`} >
                                                        <td className={`td1-meal${mealObject.id}`}>
                                                            <img src={`${mealObject.imgurl}`} className={`img img${mealObject.id}`} />
                                                        </td>
                                                        <td className={`td2-meal${mealObject.id}`}>
                                                            {mealObject.meal}
                                                        </td>
                                                        <td className={`td3-meal${mealObject.id}`}>
                                                            {mealObject.price}
                                                        </td>
                                                        <td className={`td4-meal${mealObject.id}`}>
                                                            <input type='number' className={`quantity${mealObject.id}`} placeholder='Quantity' value='1' readOnly hidden />
                                                        </td>
                                                        <td className={`td5-meal${mealObject.id}`}>
                                                            <button className={`meal-button${mealObject.id}`} onClick={() => this.onAddToCart(`${mealObject.id}`)}>Add to Cart</button>
                                                        </td>
                                                        <td>
                                                            <button className='clear-cart' onClick={() => this.onClear()}>Clear Cart</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    }
                                </table>
                            </div>
                            <div className="flex-items">
                                <p><strong>Checkout</strong></p>
                                <table className="third-table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Delivery Location
                                            <select className="location">
                                                    <option>Abuja</option>
                                                    <option>Lagos</option>
                                                    <option>Port Harcourt</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Delivery Date &#10236; <span className="date">{this.onDeliveryDate()}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="radio" name="radio" /> Pay on Delivery
                                        </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="radio" name="radio" /> Pay with debit card <img src={debitCard}
                                                    className="debit-card" alt="debit card" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button className="order-button" onClick={() => {this.onReady();  setTimeout(() => {
                                                    this.onOrderAMeal()
                                                },1000)
                                            }}>
                                                    <span className="orderValue">Order</span> <span className="orderSpinner"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}

Orders.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    statusOrder: PropTypes.string,
    errorOrder: PropTypes.string,
    orderResponse: PropTypes.string,
    data: PropTypes.array,
    act: PropTypes.func,
    GetMenu: PropTypes.func,
}

const mapStateToProps = state => ({
    status: state.getmenu.status,
    error: state.getmenu.error,
    data: state.getmenu.mealData,
    statusOrder: state.makeorder.status,
    errorOrder: state.makeorder.error,
    orderResponse: state.makeorder.orderResponse
});

const mapDispatchToProps = (dispatch) => ({
    act: (action) => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
