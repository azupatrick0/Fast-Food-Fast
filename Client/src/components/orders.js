/* eslint-disable react/no-did-mount-set-state */
import React, { Component, Fragment, createRef } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../public/styles/orderStyles.css';
import { getMenu, makeOrder } from '../actions/index';
// import OrdersView from '../components/ordersView';
import Loader from './Loader';
import Modal from '../components/Modal';
import debitCard from '../../public/images/debit_card.png';
import { NavBar } from '../components/index';

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      cart: [],
      quantity: 1,
      meal: null,
      imgurl: null,
      disabled: false,
      statusOrder: undefined,
      errorOrder: undefined,
      loading: false,
      payOnDelivery: false,
      totalAmount: 0,
      redirect: false,
      visible: false
    };
    this.quantity = createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.statusOrder &&
      props.statusOrder !== 'LOADING' &&
      props.statusOrder !== 'NOTLOADING' &&
      props.statusOrder !== state.statusOrder
    ) {
      toast.success('Order placed successfully');
      localStorage.removeItem('cart');
      return Object.assign({}, state, {
        statusOrder: 'SUCCESS',
        loading: false,
        redirect: true
      });
    } else if (
      props.errorOrder &&
      props.errorOrder !== 'LOADING' &&
      props.errorOrder !== 'NOTLOADING' &&
      props.errorOrder !== state.errorOrder
    ) {
      toast.success('An error occured while placing your order, please try again');
      return Object.assign({}, state, {
        errorOrder: 'ERROR',
        loading: false
      });
    }
    return null;
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const { getMenu, isAuthenticated } = this.props;
    if (isAuthenticated) {
      getMenu(token);
      // Load cart in case a user closes browser that have items already in cart
      const itemsInCart = JSON.parse(localStorage.getItem('cart'));
      const totalAmountInCart = JSON.parse(localStorage.getItem('amount'));
      const stateChanged =
        itemsInCart !== null &&
        new Promise((resolve) =>
          resolve(
            this.setState({
              cart: itemsInCart,
              totalAmount: totalAmountInCart
            })
          )
        );
      itemsInCart !== null &&
        stateChanged.then(() => {
          this.setState({
            clicked: true
          });
        });

      // Pay on delivery
      this.state.payOnDelivery === true && new Promise.resolve(resolve => {
        resolve(this.orderAMeal())
      }).then(() => toast.success('Order made successfully')).then(() => this.setState({
        loading: false,
        visible: false,
        payOnDelivery: false
      }));
    }
  }

  getMealItem(id) {
    const { mealData } = this.props;
    return mealData.filter((eachMealItem) => eachMealItem.id === Number(id));
  }

  isMealInState(id) {
    const { cart } = this.state;
    return cart.filter(eachMealItem =>
      Number(eachMealItem.menuid) === Number(id));
  }

  addToCart(id) {
    if (this.isMealInState(id).length < 1) {
      const getMealItem = this.getMealItem(id);
      const mealStateChanged = new Promise((resolve) =>
        resolve(
          this.setState({
            meal: getMealItem[0].meal,
            imgurl: getMealItem[0].imgurl
          })
        )
      );

      mealStateChanged.then(() => {
        const mealItem = {
          menuid: id,
          meal: this.state.meal,
          imgurl: this.state.imgurl,
          userid: localStorage.getItem('id'),
          name: localStorage.getItem('name'),
          quantity: this.state.quantity,
          amount: this.state.quantity * getMealItem[0].price
        };

        const stateChanged = new Promise((resolve) =>
          resolve(
            this.setState((prevState) => ({
              cart: [prevState.cart, mealItem].flat(),
              clicked: true
            }))
          )
        );

        stateChanged.then(() => {
          this.setState({
            totalAmount: this.state.totalAmount + this.state.quantity * getMealItem[0].price
          });
          // store to localstorage
          localStorage.setItem('cart', JSON.stringify(this.state.cart));
          localStorage.setItem('amount', JSON.stringify(this.state.totalAmount));
        });
      });
    } else {
      toast.info('Meal already added to cart, you can increase the value in the cart');
    }
  }

  changeAmount(event, id) {
    this.state.cart.filter((eachMealItem) => {
      const previousQuantity = eachMealItem.quantity;
      if (eachMealItem.menuid === id) {
        eachMealItem.amount = event.target.value * this.getMealItem(id)[0].price;
        eachMealItem.quantity = event.target.value;
        if (previousQuantity > event.target.value) {
          // Update total amount then store to localstorage
          new Promise((resolve) =>
            resolve(this.setState({
              totalAmount: this.state.totalAmount - this.getMealItem(id)[0].price
            }))).then(() => localStorage.setItem('amount', JSON.stringify(this.state.totalAmount)));
        } else {
          // Update total amount then store to localstorage
          new Promise((resolve) =>
            resolve(this.setState({
              totalAmount: this.state.totalAmount + this.getMealItem(id)[0].price
            }))).then(() => localStorage.setItem('amount', JSON.stringify(this.state.totalAmount)));
        }
      }
    });
    this.setState({
      cart: this.state.cart
    });
    // store to localstorage
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  deleteMeal(id) {
    const newCart = this.state.cart.filter((eachMealItem) => {
      if (eachMealItem.menuid === id) {
        // Update total amount and cart then store to localstorage
        new Promise((resolve) =>
          resolve(this.setState({
            totalAmount: this.state.totalAmount - eachMealItem.amount
          }))).then(() => {
            localStorage.setItem('amount', JSON.stringify(this.state.totalAmount));
            const oldCart = Array.from(JSON.parse(localStorage.getItem('cart')));
            const updatedCart = oldCart.filter(eachMealItem => eachMealItem.menuid !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
          });
      }
      return eachMealItem.menuid !== id;
    });
    this.setState({
      cart: newCart
    });
  }

  deliveryDate() {
    let day = new Date().getDate();
    day += 1;
    let month = new Date().getMonth();
    month += 1;
    const year = new Date().getFullYear();
    const date = `${day}/${month}/${year}`;
    return date;
  }

  processCardPayment(token) {
    function getTotalAmount() {
      let totalAmount = 0;
      JSON.parse(localStorage.getItem('cart')).map(eachMealItem => {
        totalAmount += Number(eachMealItem.amount);
      });
      if (totalAmount > 0) {
        return totalAmount;
      }
    }
    // This is where we make a request to the API to process stripe payment
    // Token reresents information about a user purchase
    Axios.post(`${process.env.BASE_URL_PROD}/api/v1/orders/checkout`, { token, totalAmount: getTotalAmount() })
      .then(() => {
        new Promise.resolve(resolve => {
          resolve(window.scrollTo({
            behavior: "smooth",
            top: 0
          }))
        }).then(() => this.orderAMeal())
          .then(() => toast.success('Order made successfully'))
          .then(() => setTimeout(() => location.href = '/history', 2000));
      });
  }

  payOnDelivery() {
    this.setState({
      visible: true
    });
  }

  orderAMeal() {
    const { cart } = this.state;
    const { makeOrder } = this.props;
    if (cart.length === 0) {
      toast.error('Cart cannot be empty');
    } else {
      this.setState({
        loading: true
      });
      cart.map((mealObject) => {
        if (Object.keys(mealObject).length !== 0) {
          Object.assign(mealObject, {
            location: document.querySelector('.location').value
          });
        }
      });
      makeOrder(cart, localStorage.getItem('token'), localStorage.getItem('name'));
    }
  }

  render() {
    const { status, statusOrder, mealData, isAuthenticated } = this.props;
    const { clicked, cart, loading, totalAmount, redirect, visible } = this.state;

    if (redirect) {
      <Redirect to='/history' />
    }

    if (!isAuthenticated) {
      return <Redirect to='/signin' />
    }

    return (
      <Fragment>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
        <Modal text={'Are you sure you want to pay on delivery'} visible={visible} state={this} />
        <Helmet>
          <title>Fast-Food-Fast | Order a meal</title>
          <link rel="shortcut icon" type="image/png" href="../../public/images/ffflogo.png" />
        </Helmet>
        {status === 'LOADING' || statusOrder === 'LOADING' ? !navigator.onLine ? (
          <Loader text={'You are offline, please check your internet connection'} />
        ) : (
            <Loader />
          ) : (
            <Fragment>
              <NavBar
                link0={'/Orders'}
                link1={'/History'}
                link2={'/Orders'}
                anchor1Body={'History'}
                anchor2Body={'Sign Out'}
                buttonBody={isAuthenticated? `Hello ${localStorage.getItem('name')}`: 'ORDER'}
                anchor3Body={'History'}
                anchor4Body={'Order a meal'}
                anchor5Body={'Sign Out'}
              />
              <div className="slide0-orders">
                <div className="blur-orders-page">
                  <br />
                  <br />
                  <br />
                  <span className="center white">
                    <strong>Make an order</strong>
                  </span>
                  <br />
                  <br />

                  {/* Cart */}
                  <div>
                    <div className="flex">
                      <div className="flex-items cart">
                        <table className="first-table">
                          <tbody>
                            <tr></tr>
                            <tr>
                              <td>
                                <strong>CART</strong>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Meal</td>
                              <td>Amount</td>
                              <td>Quantity</td>
                              <td>Delete Meal</td>
                              <td></td>
                            </tr>
                          </tbody>
                          {clicked && (
                            <tbody className="first-table-body">
                              <tr></tr>
                              {cart.map(mealObject => (
                                <tr key={`tr-cart${mealObject.menuid}`}>
                                  <td>{mealObject.meal}</td>
                                  <td>{mealObject.amount}</td>
                                  <td>
                                    <input
                                      type="number"
                                      required
                                      min="1"
                                      defaultValue={mealObject.quantity}
                                      ref={this.quantity}
                                      onChange={event =>
                                        this.changeAmount(event, mealObject.menuid)}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className={`cart-subtract-button${mealObject.menuid}`}
                                      onClick={() => this.deleteMeal(mealObject.menuid)}
                                    >
                                      X
																</button>
                                  </td>
                                  <td>
                                    <img
                                      src={`${mealObject.imgurl}`}
                                      className={`img img${mealObject.id}`}
                                      hidden
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                          {clicked &&
                            <tbody>
                              <tr></tr>
                              <tr>
                                <td>Total</td>
                                <td>{totalAmount}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          }
                        </table>
                        <br />
                        <br />

                        {/* Checkout */}
                        <table className="third-table">
                          <tbody>
                            <tr>
                              <td>
                                <strong>CHECKOUT</strong>
                              </td>
                            </tr>
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
                                Delivery Date &#10236;{' '}
                                <span className="date">{this.deliveryDate()}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Pay on Delivery
                                <button
                                  className='pay-on-delivery__button'
                                  onClick={() => this.payOnDelivery()}
                                >
                                  <span className="orderValue">{loading ? 'Ordering...' : 'Order'}</span>{' '}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Pay with card{' '}
                                <img src={debitCard} className="debit-card" alt="debit card" />
                                <StripeCheckout
                                  name="Fast Food Fast"
                                  description="Delcious Meals"
                                  panelLabel="Pay"
                                  amount={totalAmount * 100} // To cents
                                  currency="USD"
                                  stripeKey="pk_test_Bqf0lYovyQYmwm6bVaACKuh200TLpCem6F"
                                  shippingAddress
                                  billingAddress
                                  zipCode={false}
                                  bitcoin={true}
                                  token={this.processCardPayment}
                                >
                                  <button>
                                    Order
                                </button>
                                </StripeCheckout>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <br />
                      <br />

                      {/* Delicious Meal */}
                      <div className="flex-items">
                        <table className="second-table">
                          <tbody>
                            <tr></tr>
                            <tr>
                              <td>
                                <strong>DELICIOUS MEALS</strong>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>

                          {(
                            <tbody>
                              {mealData && mealData.length > 0 && mealData.map(mealObject => {
                                return (
                                  <tr key={`tr-meal${mealObject.id}`}>
                                    <td>
                                      <img
                                        src={`${mealObject.imgurl}`}
                                        className={`img img${mealObject.id}`}
                                      />
                                    </td>
                                    <td>{mealObject.meal}</td>
                                    <td>{mealObject.price}</td>
                                    <td>
                                      <button
                                        className={`meal-button${mealObject.id}`}
                                        onClick={() =>
                                          this.addToCart(`${mealObject.id}`)}
                                      >
                                        Add to Cart
                                      </button>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        className={`quantity${mealObject.id}`}
                                        placeholder="Quantity"
                                        value="1"
                                        readOnly
                                        hidden
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
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
  getMenu: PropTypes.func,
  mealData: PropTypes.array,
  makeOrder: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = ({ getmenu, makeorder }) => ({
  status: getmenu.status,
  error: getmenu.error,
  statusOrder: makeorder.status,
  errorOrder: makeorder.error,
  orderResponse: makeorder.orderResponse,
  mealData: getmenu.mealData
});

export default connect(mapStateToProps, {
  getMenu,
  makeOrder
})(Orders);
