// /* eslint-disable react/display-name */
// /* eslint-disable import/no-named-as-default */
// import React, { Fragment } from 'react';
// import Helmet from 'react-helmet';
// import PropTypes from 'prop-types';
// import Loader from './Loader';
// import { Redirect } from 'react-router-dom';
// import debitCard from '../../public/images/debit_card.png';
// import { NavBar } from '../components/index';
// import Modal from './Modal';

// const OrdersView = ({
//   state,
// 	status,
//   error,
//   getMealItem,
// 	statusOrder,
// 	errorOrder,
// 	mealData,
// 	onPlus,
// 	onMinus,
// 	addToCart,
// 	onDeliveryDate,
// 	onOrderAMeal,
// 	onShowCart
// }) => (
// 		<Fragment>
// 			<Helmet>
// 				<title>Fast-Food-Fast | Order a meal</title>
// 				<link rel="shortcut icon" type="image/png" href="../../public/images/ffflogo.png" />
// 			</Helmet>
// 			{status === 'LOADING' || statusOrder === 'LOADING' ? (
//         !navigator.onLine ? <Loader text={'You are offline, please check your internet connection'}/> : <Loader />
// 			) : (
// 				<Fragment>
// 					<NavBar
// 						link0={'/Orders'}
// 						link1={'/History'}
// 						link2={'/Orders'}
// 						anchor1Body={'History'}
// 						anchor2Body={'Sign Out'}
// 						buttonBody={'ORDER'}
// 						anchor3Body={'History'}
// 						anchor4Body={'Order a meal'}
// 						anchor5Body={'Sign Out'}
// 					/>
// 					<div className="slide0">
// 						<br />
// 						<br />
// 						<br />
// 						<span className="center">
// 							<strong>Make your order</strong>
// 						</span>
// 						<br />
// 						<br />
// 						<button className="toggle-cart" onClick={() => onShowCart()}>
// 							Show Cart
// 						</button>
// 						<br />
// 						<br />
// 						<div className="blur2">
// 							<div className="flex">
// 								<div className="flex-items cart">
// 									<p>
// 										<strong>Cart</strong>
// 									</p>
// 									<table className="first-table">
// 										{state.clicked && (
// 											<tbody className="first-table-body">
// 												{state.cart.map((mealObject) => (
// 													<tr
// 														className={`tr-cart${mealObject.id}`}
// 														key={`tr-cart${mealObject.id}`}
// 													>
// 														<td className={`td2-cart${mealObject.id}`}>
// 															{mealObject.meal}
// 														</td>
// 														<td className={`td3-cart${mealObject.id}`}>
// 															{mealObject.price}
// 														</td>
// 														<td className={`td4-cart${mealObject.id}`}>{1}</td>
// 														<td className={`td5-cart${mealObject.id}`}>
// 															<button
// 																className={`cart-add-button${mealObject.id}`}
// 																onClick={() => onPlus(`${mealObject.id}`)}
// 															>
// 																+
// 															</button>
// 														</td>
// 														<td className={`td6-cart${mealObject.id}`}>
// 															<button
// 																className={`cart-subtract-button${mealObject.id}`}
// 																onClick={() => onMinus(`${mealObject.id}`)}
// 															>
// 																-
// 															</button>
// 														</td>
// 														<td className={`td1-cart${mealObject.id}`}>
// 															<img
// 																src={`${mealObject.imgurl}`}
// 																className={`img img${mealObject.id}`}
// 																hidden
// 															/>
// 														</td>
// 													</tr>
// 												))}
// 											</tbody>
// 										)}
// 									</table>
// 									<table className="third-table">
// 										<tbody>
// 											<tr>
// 												<td>
// 													<strong>Checkout</strong>
// 												</td>
// 											</tr>
// 											<tr>
// 												<td>
// 													Delivery Location
// 													<select className="location">
// 														<option>Abuja</option>
// 														<option>Lagos</option>
// 														<option>Port Harcourt</option>
// 													</select>
// 												</td>
// 											</tr>
// 											<tr>
// 												<td>
// 													Delivery Date &#10236;{' '}
// 													<span className="date">{onDeliveryDate()}</span>
// 												</td>
// 											</tr>
// 											<tr>
// 												<td>
// 													<input type="radio" name="radio" /> Pay on Delivery
// 												</td>
// 											</tr>
// 											<tr>
// 												<td>
// 													<input type="radio" name="radio" /> Pay with debit card{' '}
// 													<img src={debitCard} className="debit-card" alt="debit card" />
// 												</td>
// 											</tr>
// 											<tr>
// 												<td>
// 													<button
// 														className="order-button"
// 														onClick={() => {
// 															setTimeout(() => {
// 																onOrderAMeal();
// 															}, 1000);
// 														}}
// 													>
// 														<span className="orderValue">Order</span>{' '}
// 														<span className="orderSpinner" />
// 													</button>
// 												</td>
// 											</tr>
// 										</tbody>
// 									</table>
// 								</div>
// 								<div className="flex-items">
// 									<p>
// 										<strong>Delicious Meals</strong>
// 									</p>
// 									<table className="second-table">
// 										{status === 'SUCCESS' && (
// 											<tbody>
// 												{mealData.map((mealObject) => {
// 													return (
// 														<tr
// 															className={`tr-meal${mealObject.id}`}
// 															key={`tr-meal${mealObject.id}`}
// 														>
// 															<td className={`td1-meal${mealObject.id}`}>
// 																<img
// 																	src={`${mealObject.imgurl}`}
// 																	className={`img img${mealObject.id}`}
// 																/>
// 															</td>
// 															<td className={`td2-meal${mealObject.id}`}>
// 																{mealObject.meal}
// 															</td>
// 															<td className={`td3-meal${mealObject.id}`}>
// 																{mealObject.price}
// 															</td>
// 															<td className={`td5-meal${mealObject.id}`}>
// 																<button
// 																	className={`meal-button${mealObject.id}`}
// 																	onClick={() => addToCart(`${mealObject.id}`)}
// 																>
// 																	Add to Cart
// 																</button>
// 															</td>
// 															<td className={`td4-meal${mealObject.id}`}>
// 																<input
// 																	type="number"
// 																	className={`quantity${mealObject.id}`}
// 																	placeholder="Quantity"
// 																	value="1"
// 																	readOnly
// 																	hidden
// 																/>
// 															</td>
// 														</tr>
// 													);
// 												})}
// 											</tbody>
// 										)}
// 									</table>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</Fragment>
// 			)}
// 		</Fragment>
// 	);

// OrdersView.propTypes = {
// 	status: PropTypes.string,
// 	onPlus: PropTypes.func,
// 	onMinus: PropTypes.func,
// 	addToCart: PropTypes.func,
// 	onDeliveryDate: PropTypes.func,
// 	onOrderAMeal: PropTypes.func,
// 	onShowCart: PropTypes.func,
// 	error: PropTypes.string,
// 	statusOrder: PropTypes.string,
// 	errorOrder: PropTypes.string,
// 	mealData: PropTypes.array,
// 	state: PropTypes.object
// };

// export default OrdersView;

// <Fragment>
//   <OrdersView
//     state={this.state}
//     status={this.props.status}
//     error={this.props.error}
//     statusOrder={this.props.statusOrder}
//     errorOrder={this.props.errorOrder}
//     orderResponse={this.props.orderResponse}
//     mealData={this.props.mealData}
//     onPlus={this.plus}
//     onMinus={this.minus}
//     addToCart={this.addToCart}
//     onDeliveryDate={this.deliveryDate}
//     onOrderAMeal={this.orderAMeal}
//     onShowCart={this.showCart}
//   />
// </Fragment>