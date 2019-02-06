/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default */
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import debitCard from '../../public/images/debit_card.png';
import { NavBar } from '../components/index';
import Orders from '../components/orders';

const ordersView = () => {
	return (
		<Orders>
			{(data) => (
				<Fragment>
					{data.status === 'LOADING' || data.statusOrder === 'LOADING' ? (
						(data.spinner.current.style.display = 'block')
					) : data.status === 'NOTLOADING' || data.statusOrder === 'NOTLOADING' ? (
						(data.spinner.current.style.display = '')
					) : data.status === 'ERROR' || data.statusOrder === 'ERROR' ? (
						(data.modal.current.style.display = 'block')
					) : data.status === 'FAILED' || data.statusOrder === 'FAILED' ? (
						<Redirect to="/signin" />
					) : data.statusOrder === 'SUCCESS' ? (
						<Redirect to="/history" />
					) : (
						''
					)}

					<Helmet>
						<title>Fast-Food-Fast | Order a meal</title>
						<link rel="shortcut icon" type="image/png" href="../../public/images/ffflogo.png" />
					</Helmet>

					<NavBar
						link0={'https://fast-food-fast.herokuapp.com/Orders'}
						link1={'https://fast-food-fast.herokuapp.com/History'}
						link2={'https://fast-food-fast.herokuapp.com/Orders'}
						anchor1Body={'History'}
						anchor2Body={'Sign Out'}
						buttonBody={'ORDER'}
						anchor3Body={'History'}
						anchor4Body={'Order a meal'}
						anchor5Body={'Sign Out'}
					/>
					<div className="modal feedback" ref={data.feedback2}>
						Cart quantity cannot be less than 1{' '}
						<button onClick={() => (data.feedback2.current.style.display = 'none')}>Ok</button>
					</div>
					<div className="modal feedback" ref={data.feedback}>
						Cart cannot be empty{' '}
						<button onClick={() => (data.feedback.current.style.display = 'none')}>Ok</button>
					</div>
					<div className="modal" ref={data.modal}>
						<p>
							{data.error || data.errorOrder}
							<br />
							<br />Click <a href="/orders">Here</a>
						</p>
					</div>
					<div className="slide0">
						<br />
						<br />
						<br />
						<span className="center">
							<strong>Make your order</strong>
						</span>
						<br />
						<br />
						<button className="toggle-cart" ref={data.toggleCart} onClick={() => data.onShowCart()}>
							Show Cart
						</button>
						<br />
						<br />
						<div className="blur2">
							<div className="flex">
								<div className="flex-items cart" ref={data.cart}>
									<p>
										<strong>Cart</strong>
									</p>
									<table className="first-table" ref={data.firstTable}>
										{data.state.clicked === true && (
											<tbody className="first-table-body">
												{data.newCart.map((mealClass) => {
													{
														document.querySelector(
															`.meal-button${mealClass}`
														).disabled = true;
													}
													const mealObject = data.data.find((mealObject) => {
														return mealObject.id === Number(mealClass);
													});
													return (
														<tr
															className={`tr-cart${mealObject.id}`}
															key={`tr-cart${mealObject.id}`}
														>
															<td className={`td2-cart${mealObject.id}`}>
																{mealObject.meal}
															</td>
															<td className={`td3-cart${mealObject.id}`}>
																{mealObject.price}
															</td>
															<td className={`td4-cart${mealObject.id}`}>{1}</td>
															<td className={`td5-cart${mealObject.id}`}>
																<button
																	className={`cart-add-button${mealObject.id}`}
																	onClick={() => data.onPlus(`${mealObject.id}`)}
																>
																	+
																</button>
															</td>
															<td className={`td6-cart${mealObject.id}`}>
																<button
																	className={`cart-subtract-button${mealObject.id}`}
																	onClick={() => data.onMinus(`${mealObject.id}`)}
																>
																	-
																</button>
															</td>
															<td className={`td1-cart${mealObject.id}`}>
																<img
																	src={`${mealObject.imgurl}`}
																	className={`img img${mealObject.id}`}
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
								<div className="spinner" ref={data.spinner} />
								<div className="flex-items">
									<p>
										<strong>Delicious Meals</strong>
									</p>
									<table className="second-table" ref={data.secondTable}>
										{data.status === 'SUCCESS' && (
											<tbody>
												{data.data.map((mealObject) => {
													return (
														<tr
															className={`tr-meal${mealObject.id}`}
															key={`tr-meal${mealObject.id}`}
														>
															<td className={`td1-meal${mealObject.id}`}>
																<img
																	src={`${mealObject.imgurl}`}
																	className={`img img${mealObject.id}`}
																/>
															</td>
															<td className={`td2-meal${mealObject.id}`}>
																{mealObject.meal}
															</td>
															<td className={`td3-meal${mealObject.id}`}>
																{mealObject.price}
															</td>
															<td className={`td5-meal${mealObject.id}`}>
																<button
																	className={`meal-button${mealObject.id}`}
																	onClick={() => data.onAddToCart(`${mealObject.id}`)}
																>
																	Add to Cart
																</button>
															</td>
															<td className={`td4-meal${mealObject.id}`}>
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
								<div className="flex-items">
									<p>
										<strong>Checkout</strong>
									</p>
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
													Delivery Date &#10236;{' '}
													<span className="date">{data.onDeliveryDate()}</span>
												</td>
											</tr>
											<tr>
												<td>
													<input type="radio" name="radio" /> Pay on Delivery
												</td>
											</tr>
											<tr>
												<td>
													<input type="radio" name="radio" /> Pay with debit card{' '}
													<img src={debitCard} className="debit-card" alt="debit card" />
												</td>
											</tr>
											<tr>
												<td>
													<button
														className="order-button"
														onClick={() => {
															data.onReady();
															setTimeout(() => {
																data.onOrderAMeal();
															}, 1000);
														}}
													>
														<span className="orderValue">Order</span>{' '}
														<span className="orderSpinner" />
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
			)}
		</Orders>
	);
};

export default ordersView;
