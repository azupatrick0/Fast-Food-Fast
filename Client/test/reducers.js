import { expect } from 'chai';
import bcrypt from 'bcrypt';
import {
	SignupReducer,
	SigninReducer,
	MakeOrderReducer,
	GetMenuReducer,
	GetHistoryReducer,
	GetAllOrdersReducer,
	AcceptOrdersReducer,
	DeclineOrdersReducer,
	CompleteOrdersReducer,
	UpdateMenuReducer,
	PopulateMenuReducer,
	DeletedMenuReducer,
	CloudinaryReducer
} from '../src/reducers/index';

require('browser-env')();

const history = {
	status: 'success',
	data: {
		message: 'All orders history returned, thank you.',
		history: [
			{
				id: 4,
				menuid: 1,
				meal: 'Fruttie',
				imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986387/yjvhhoun9pajw07zu0dw.jpg',
				userid: 1,
				name: 'Azu Patrick',
				quantity: 2,
				amount: 800,
				location: 'Lagos',
				status: 'new',
				createdat: '2018-10-21T08:28:42.590Z',
				createddate: '2018-10-21T00:00:00.000Z'
			},
			{
				id: 3,
				menuid: 2,
				meal: 'Burger',
				imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986437/psjp6ayhoemdidt8vcro.png',
				userid: 1,
				name: 'Azu Patrick',
				quantity: 3,
				amount: 600,
				location: 'Abuja',
				status: 'processing',
				createdat: '2018-10-19T22:02:06.962Z',
				createddate: '2018-10-19T00:00:00.000Z'
			},
			{
				id: 2,
				menuid: 3,
				meal: 'Veggie',
				imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png',
				userid: 1,
				name: 'Azu Patrick',
				quantity: 9,
				amount: 3150,
				location: 'Abuja',
				status: 'complete',
				createdat: '2018-10-19T22:02:03.956Z',
				createddate: '2018-10-19T00:00:00.000Z'
			},
			{
				id: 1,
				menuid: 1,
				meal: 'Fruttie',
				imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986387/yjvhhoun9pajw07zu0dw.jpg',
				userid: 1,
				name: 'Azu Patrick',
				quantity: 4,
				amount: 1600,
				location: 'Abuja',
				status: 'complete',
				createdat: '2018-10-19T22:02:03.869Z',
				createddate: '2018-10-19T00:00:00.000Z'
			}
		]
	}
};

const allOrders = {
	status: 'success',
	data: {
		message: 'All orders returned, thank you.',
		orders: [
			{
				id: 3,
				menuid: 2,
				meal: 'Burger',
				imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986437/psjp6ayhoemdidt8vcro.png',
				userid: 1,
				name: 'Azu Patrick',
				quantity: 3,
				amount: 600,
				location: 'Abuja',
				status: 'processing',
				createdat: '2018-10-19T22:02:06.962Z',
				createddate: '2018-10-19T00:00:00.000Z'
			},
			{
				id: 2,
				menuid: 3,
				meal: 'Veggie',
				imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png',
				userid: 1,
				name: 'Azu Patrick',
				quantity: 9,
				amount: 3150,
				location: 'Abuja',
				status: 'complete',
				createdat: '2018-10-19T22:02:03.956Z',
				createddate: '2018-10-19T00:00:00.000Z'
			},
			{
				id: 1,
				menuid: 1,
				meal: 'Fruttie',
				imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986387/yjvhhoun9pajw07zu0dw.jpg',
				userid: 1,
				name: 'Azu Patrick',
				quantity: 4,
				amount: 1600,
				location: 'Abuja',
				status: 'new',
				createdat: '2018-10-19T22:02:03.869Z',
				createddate: '2018-10-19T00:00:00.000Z'
			}
		]
	}
};

describe('Fast-Food-Fast Client Reducers Test Suite', () => {
	// FROM: https://www.npmjs.com/package/node-localstorage
	beforeEach(() => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ';

		if (typeof localStorage === 'undefined' || localStorage === null) {
			var LocalStorage = require('node-localstorage').LocalStorage;
			// eslint-disable-next-line no-global-assign
			localStorage = new LocalStorage('./scratch');
		}

		localStorage.setItem('token', token);
	});
	describe('Sign up Reducers', () => {
		it('returns status error when an error occurs during sign up', () => {
			const initialState = {
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			};
			const state = SignupReducer(initialState, {
				type: 'USER_SIGNUP_ERROR',
				payload: 'An error occured while signing you up, please try again',
				error: {}
			});
			expect(state).to.eql({
				name: null,
				email: null,
				password: null,
				role: null,
				status: 'ERROR',
				error: 'An error occured while signing you up, please try again'
			});
		});

		it('returns status failed when sign up fails', () => {
			const initialState = {
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			};
			const state = SignupReducer(initialState, {
				type: 'USER_SIGNUP_FAILED',
				payload: 'Email => azupatrick0@gmail.com already in use, please choose another.'
			});

			expect(state).to.eql({
				name: null,
				email: null,
				password: null,
				role: null,
				status: 'FAILED',
				error: 'Email => azupatrick0@gmail.com already in use, please choose another.'
			});
		});

		it('returns updated state after sign up success', () => {
			const initialState = {
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			};

			// Encrypt password
			const saltRounds = 10;
			const encryptedPassword = bcrypt.hashSync('dfghjklasdfghgfdsdf23456', saltRounds);
			const state = SignupReducer(initialState, {
				type: 'USER_SIGNUP_SUCCESS',
				payload: {
					name: 'azu',
					email: 'azupatrick00000@gmail.com',
					password: encryptedPassword,
					role: 'user',
					status: 'SUCCESS',
					error: ''
				}
			});
			expect(state).to.eql({
				name: 'azu',
				email: 'azupatrick00000@gmail.com',
				password: encryptedPassword,
				role: 'user',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default sign up state if no action is specified', () => {
			const initialState = {
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			};
			const state = SignupReducer(initialState, {
				type: '',
				payload: {
					name: '',
					email: '',
					password: '',
					role: '',
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			});
		});
		it('should return the sign up initial state', () => {
			expect(SignupReducer(undefined, {})).to.eql({
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			});
		});
	});

	describe('Sign in Reducers', () => {
		it('returns status error when an error occurs during sign in', () => {
			const initialState = {
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			};
			const state = SigninReducer(initialState, {
				type: 'USER_SIGNIN_ERROR',
				payload: 'An error occured while signing you in, please try again',
				error: {}
			});
			expect(state).to.eql({
				name: '',
				email: '',
				password: '',
				role: '',
				status: 'ERROR',
				error: 'An error occured while signing you in, please try again'
			});
		});

		it('returns status failed when sign in fails', () => {
			const initialState = {
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			};
			const state = SigninReducer(initialState, {
				type: 'USER_SIGNIN_FAILED',
				payload: 'Email or password incorrect'
			});

			expect(state).to.eql({
				name: '',
				email: '',
				password: '',
				role: '',
				status: 'FAILED',
				error: 'Email or password incorrect'
			});
		});

		it('returns updated signin state after sign in success', () => {
			const initialState = {
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			};

			const state = SigninReducer(initialState, {
				type: 'USER_SIGNIN_SUCCESS',
				payload: {
					name: 'Azu Patrick',
					role: 'user',
					status: 'SUCCESS'
				}
			});
			expect(state).to.eql({
				name: 'Azu Patrick',
				email: '',
				password: '',
				role: 'user',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default signin state if no action is specified', () => {
			const initialState = {
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			};
			const state = SigninReducer(initialState, {
				type: '',
				payload: {
					name: '',
					email: '',
					password: '',
					role: '',
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			});
		});
		it('should return the initial signin state', () => {
			expect(SigninReducer(undefined, {})).to.eql({
				name: '',
				email: '',
				password: '',
				role: '',
				status: '',
				error: ''
			});
		});
	});

	describe('Make Orders Reducers', () => {
		it('returns LOADING when loading orders from the server', () => {
			const initialState = {
				orderResponse: null,
				status: '',
				error: ''
			};
			const state = MakeOrderReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				orderResponse: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not loading orders from the server', () => {
			const initialState = {
				orderResponse: null,
				status: '',
				error: ''
			};
			const state = MakeOrderReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				orderResponse: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during making an order', () => {
			const initialState = {
				orderResponse: null,
				status: 'ERROR',
				error: 'An error occured while trying to process your order, please try again'
			};
			const state = MakeOrderReducer(initialState, {
				type: 'ORDER_MEAL_ERROR',
				payload: 'An error occured while trying to process your order, please try again'
			});
			expect(state).to.eql({
				orderResponse: null,
				status: 'ERROR',
				error: 'An error occured while trying to process your order, please try again'
			});
		});

		it('returns status failed when order fails', () => {
			const initialState = {
				orderResponse: null,
				status: '',
				error: ''
			};
			const state = MakeOrderReducer(initialState, {
				type: 'ORDER_MEAL_FAILED',
				payload: 'Failed to authenticate user token'
			});

			expect(state).to.eql({ orderResponse: null, status: 'FAILED', error: 'Failed to authenticate user token' });
		});

		it('returns updated state after order success', () => {
			const initialState = {
				orderResponse: null,
				status: '',
				error: ''
			};
			const state = MakeOrderReducer(initialState, {
				type: 'ORDER_MEAL_SUCCESS',
				payload: 'Your order has been processed, thank you'
			});
			expect(state).to.eql({
				orderResponse: 'Your order has been processed, thank you',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default make order state if no action is specified', () => {
			const initialState = {
				orderResponse: null,
				status: '',
				error: ''
			};
			const state = MakeOrderReducer(initialState, {
				type: '',
				payload: {
					orderResponse: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				orderResponse: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial make order state', () => {
			expect(MakeOrderReducer(undefined, {})).to.eql({
				orderResponse: null,
				status: '',
				error: ''
			});
		});
	});

	describe('Get Menu Reducers', () => {
		it('returns LOADING when loading menu from the server', () => {
			const initialState = {
				mealData: null,
				status: '',
				error: ''
			};
			const state = GetMenuReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				mealData: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not loading menu from the server', () => {
			const initialState = {
				mealData: null,
				status: '',
				error: ''
			};
			const state = GetMenuReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				mealData: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during fetching menu', () => {
			const initialState = {
				mealData: null,
				status: 'ERROR',
				error: 'An error occured while retrieving available menu, please try again'
			};
			const state = GetMenuReducer(initialState, {
				type: 'GET_MENU_ERROR',
				payload: 'An error occured while retrieving available menu, please try again'
			});
			expect(state).to.eql({
				mealData: null,
				status: 'ERROR',
				error: 'An error occured while retrieving available menu, please try again'
			});
		});

		it('returns status failed when getting menu fails', () => {
			const initialState = {
				mealData: null,
				status: '',
				error: ''
			};
			const state = GetMenuReducer(initialState, {
				type: 'GET_MENU_FAILED',
				payload: 'Failed to authenticate user token'
			});

			expect(state).to.eql({ mealData: null, status: 'FAILED', error: 'Failed to authenticate user token' });
		});

		it('returns updated state after fetching menu success', () => {
			const initialState = {
				mealData: null,
				status: '',
				error: ''
			};
			const state = GetMenuReducer(initialState, {
				type: 'GET_MENU_SUCCESS',
				payload: [
					{
						id: 1,
						meal: 'Fruttie',
						price: 400,
						imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986387/yjvhhoun9pajw07zu0dw.jpg',
						createdat: '2018-10-19T21:59:48.634Z',
						updatedat: '2018-10-19T21:59:48.634Z'
					},
					{
						id: 2,
						meal: 'Burger',
						price: 200,
						imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986437/psjp6ayhoemdidt8vcro.png',
						createdat: '2018-10-19T22:00:39.734Z',
						updatedat: '2018-10-19T22:00:39.734Z'
					},
					{
						id: 3,
						meal: 'Veggie',
						price: 350,
						imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png',
						createdat: '2018-10-19T22:01:08.732Z',
						updatedat: '2018-10-19T22:01:08.732Z'
					}
				]
			});
			expect(state).to.eql({
				mealData: [
					{
						id: 1,
						meal: 'Fruttie',
						price: 400,
						imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986387/yjvhhoun9pajw07zu0dw.jpg',
						createdat: '2018-10-19T21:59:48.634Z',
						updatedat: '2018-10-19T21:59:48.634Z'
					},
					{
						id: 2,
						meal: 'Burger',
						price: 200,
						imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986437/psjp6ayhoemdidt8vcro.png',
						createdat: '2018-10-19T22:00:39.734Z',
						updatedat: '2018-10-19T22:00:39.734Z'
					},
					{
						id: 3,
						meal: 'Veggie',
						price: 350,
						imgurl: 'https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png',
						createdat: '2018-10-19T22:01:08.732Z',
						updatedat: '2018-10-19T22:01:08.732Z'
					}
				],
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default menu state if no action is specified', () => {
			const initialState = {
				mealData: null,
				status: '',
				error: ''
			};
			const state = GetMenuReducer(initialState, {
				type: '',
				payload: {
					mealData: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				mealData: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial get menu state', () => {
			expect(GetMenuReducer(undefined, {})).to.eql({
				mealData: null,
				status: '',
				error: ''
			});
		});
	});

	describe('Get History Reducers', () => {
		it('returns LOADING when loading history from the server', () => {
			const initialState = {
				history: null,
				status: '',
				error: ''
			};
			const state = GetHistoryReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				history: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not loading history from the server', () => {
			const initialState = {
				history: null,
				status: '',
				error: ''
			};
			const state = GetHistoryReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				history: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during fetching history', () => {
			const initialState = {
				history: null,
				status: 'ERROR',
				error: 'An error occured while retrieving all your orders history, please try again'
			};
			const state = GetHistoryReducer(initialState, {
				type: 'GET_HISTORY_ERROR',
				payload: 'An error occured while retrieving all your orders history, please try again'
			});
			expect(state).to.eql({
				history: null,
				status: 'ERROR',
				error: 'An error occured while retrieving all your orders history, please try again'
			});
		});

		it('returns status failed when getting history fails', () => {
			const initialState = {
				history: null,
				status: '',
				error: ''
			};
			const state = GetHistoryReducer(initialState, {
				type: 'GET_HISTORY_FAILED',
				payload: 'Failed to authenticate user token'
			});

			expect(state).to.eql({ history: null, status: 'FAILED', error: 'Failed to authenticate user token' });
		});

		it('returns updated state after fetching history success', () => {
			const initialState = {
				history: null,
				status: '',
				error: ''
			};
			const state = GetHistoryReducer(initialState, {
				type: 'GET_HISTORY_SUCCESS',
				payload: history
			});
			expect(state).to.eql({
				history: history,
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default history state if no action is specified', () => {
			const initialState = {
				history: null,
				status: '',
				error: ''
			};
			const state = GetHistoryReducer(initialState, {
				type: '',
				payload: {
					history: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				history: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial history state', () => {
			expect(GetHistoryReducer(undefined, {})).to.eql({
				history: null,
				status: '',
				error: ''
			});
		});
	});

	describe('GetAllOrders Reducers', () => {
		it('returns LOADING when loading all orders from the server', () => {
			const initialState = {
				orders: null,
				status: '',
				error: ''
			};
			const state = GetAllOrdersReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				orders: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not loading all orders from the server', () => {
			const initialState = {
				orders: null,
				status: '',
				error: ''
			};
			const state = GetAllOrdersReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				orders: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during fetching all orders', () => {
			const initialState = {
				orders: null,
				status: 'ERROR',
				error: 'An error occured while retrieving all orders, please try again'
			};
			const state = GetAllOrdersReducer(initialState, {
				type: 'GET_ORDERS_ERROR',
				payload: 'An error occured while retrieving all orders, please try again'
			});
			expect(state).to.eql({
				orders: null,
				status: 'ERROR',
				error: 'An error occured while retrieving all orders, please try again'
			});
		});

		it('returns status failed when getting all orders fails', () => {
			const initialState = {
				orders: null,
				status: '',
				error: ''
			};
			const state = GetAllOrdersReducer(initialState, {
				type: 'GET_ORDERS_FAILED',
				payload: 'Failed to authenticate user token'
			});

			expect(state).to.eql({ orders: null, status: 'FAILED', error: 'Failed to authenticate user token' });
		});

		it('returns updated state after fetching orders success', () => {
			const initialState = {
				orders: null,
				status: '',
				error: ''
			};
			const state = GetAllOrdersReducer(initialState, {
				type: 'GET_ORDERS_SUCCESS',
				payload: allOrders
			});
			expect(state).to.eql({
				orders: allOrders,
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default all orders state if no action is specified', () => {
			const initialState = {
				orders: null,
				status: '',
				error: ''
			};
			const state = GetAllOrdersReducer(initialState, {
				type: '',
				payload: {
					orders: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				orders: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial all orders state', () => {
			expect(GetAllOrdersReducer(undefined, {})).to.eql({
				orders: null,
				status: '',
				error: ''
			});
		});
	});

	describe('AcceptOrders Reducers', () => {
		it('returns LOADING when loading all orders from the server', () => {
			const initialState = {
				acceptorders: null,
				status: '',
				error: ''
			};
			const state = AcceptOrdersReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				acceptorders: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not loading all orders from the server', () => {
			const initialState = {
				acceptorders: null,
				status: '',
				error: ''
			};
			const state = AcceptOrdersReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				acceptorders: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during accepting orders', () => {
			const initialState = {
				acceptorders: null,
				status: 'ERROR',
				error: 'An error occured while trying to update the order, please try again'
			};
			const state = AcceptOrdersReducer(initialState, {
				type: 'ACCEPT_ORDERS_ERROR',
				payload: 'An error occured while trying to update the order, please try again'
			});
			expect(state).to.eql({
				acceptorders: null,
				status: 'ERROR',
				error: 'An error occured while trying to update the order, please try again'
			});
		});

		it('returns updated state after admin accepting orders', () => {
			const initialState = {
				acceptorders: null,
				status: '',
				error: ''
			};
			const state = AcceptOrdersReducer(initialState, {
				type: 'ACCEPT_ORDERS_SUCCESS',
				payload: '1'
			});
			expect(state).to.eql({
				acceptorders: '1',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default accept order state if no action is specified', () => {
			const initialState = {
				acceptorders: null,
				status: '',
				error: ''
			};
			const state = AcceptOrdersReducer(initialState, {
				type: '',
				payload: {
					acceptorders: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				acceptorders: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial accept orders state', () => {
			expect(AcceptOrdersReducer(undefined, {})).to.eql({
				acceptorders: null,
				status: '',
				error: ''
			});
		});
	});

	describe('DeclineOrders Reducers', () => {
		it('returns LOADING when loading all orders from the server', () => {
			const initialState = {
				declineorders: null,
				status: '',
				error: ''
			};
			const state = DeclineOrdersReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				declineorders: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not loading all orders from the server', () => {
			const initialState = {
				declineorders: null,
				status: '',
				error: ''
			};
			const state = DeclineOrdersReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				declineorders: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during declining orders', () => {
			const initialState = {
				declineorders: null,
				status: 'ERROR',
				error: 'An error occured while trying to update the order, please try again'
			};
			const state = DeclineOrdersReducer(initialState, {
				type: 'DECLINE_ORDERS_ERROR',
				payload: 'An error occured while trying to update the order, please try again'
			});
			expect(state).to.eql({
				declineorders: null,
				status: 'ERROR',
				error: 'An error occured while trying to update the order, please try again'
			});
		});

		it('returns updated state after admin declining orders', () => {
			const initialState = {
				declineorders: null,
				status: '',
				error: ''
			};
			const state = DeclineOrdersReducer(initialState, {
				type: 'DECLINE_ORDERS_SUCCESS',
				payload: '1'
			});
			expect(state).to.eql({
				declineorders: '1',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default decline order state if no action is specified', () => {
			const initialState = {
				declineorders: null,
				status: '',
				error: ''
			};
			const state = DeclineOrdersReducer(initialState, {
				type: '',
				payload: {
					declineorders: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				declineorders: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial decline orders state', () => {
			expect(DeclineOrdersReducer(undefined, {})).to.eql({
				declineorders: null,
				status: '',
				error: ''
			});
		});
	});

	describe('CompleteOrders Reducers', () => {
		it('returns LOADING when loading all orders from the server', () => {
			const initialState = {
				completeorders: null,
				status: '',
				error: ''
			};
			const state = CompleteOrdersReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				completeorders: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not loading all orders from the server', () => {
			const initialState = {
				completeorders: null,
				status: '',
				error: ''
			};
			const state = CompleteOrdersReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				completeorders: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during completing orders', () => {
			const initialState = {
				completeorders: null,
				status: 'ERROR',
				error: 'An error occured while trying to update the order, please try again'
			};
			const state = CompleteOrdersReducer(initialState, {
				type: 'COMPLETE_ORDERS_ERROR',
				payload: 'An error occured while trying to update the order, please try again'
			});
			expect(state).to.eql({
				completeorders: null,
				status: 'ERROR',
				error: 'An error occured while trying to update the order, please try again'
			});
		});

		it('returns updated state after admin completing orders', () => {
			const initialState = {
				completeorders: null,
				status: '',
				error: ''
			};
			const state = CompleteOrdersReducer(initialState, {
				type: 'COMPLETE_ORDERS_SUCCESS',
				payload: '1'
			});
			expect(state).to.eql({
				completeorders: '1',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default complete order state if no action is specified', () => {
			const initialState = {
				completeorders: null,
				status: '',
				error: ''
			};
			const state = CompleteOrdersReducer(initialState, {
				type: '',
				payload: {
					completeorders: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				completeorders: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial complete order state', () => {
			expect(CompleteOrdersReducer(undefined, {})).to.eql({
				acceptorders: null,
				status: '',
				error: ''
			});
		});
	});

	describe('UpdateMenu Reducers', () => {
		it('returns LOADING when updating menu', () => {
			const initialState = {
				updatedMealData: null,
				status: '',
				error: ''
			};
			const state = UpdateMenuReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				updatedMealData: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not updating menu', () => {
			const initialState = {
				updatedMealData: null,
				status: '',
				error: ''
			};
			const state = UpdateMenuReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				updatedMealData: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during updating menu', () => {
			const initialState = {
				updatedMealData: null,
				status: 'ERROR',
				error: 'An error occured while trying to update the item, please try again.'
			};
			const state = UpdateMenuReducer(initialState, {
				type: 'UPDATE_MENU_ERROR',
				payload: 'An error occured while trying to update the item, please try again.'
			});
			expect(state).to.eql({
				updatedMealData: null,
				status: 'ERROR',
				error: 'An error occured while trying to update the item, please try again.'
			});
		});

		it('returns updated state after admin updates menu', () => {
			const initialState = {
				updatedMealData: null,
				status: '',
				error: ''
			};
			const state = UpdateMenuReducer(initialState, {
				type: 'UPDATE_MENU_SUCCESS',
				payload: 'Item with id => 1, updated successfully.'
			});
			expect(state).to.eql({
				updatedMealData: 'Item with id => 1, updated successfully.',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default update menu state if no action is specified', () => {
			const initialState = {
				updatedMealData: null,
				status: '',
				error: ''
			};
			const state = UpdateMenuReducer(initialState, {
				type: '',
				payload: {
					updatedMealData: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				updatedMealData: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial update menu state', () => {
			expect(UpdateMenuReducer(undefined, {})).to.eql({
				updatedMealData: null,
				status: '',
				error: ''
			});
		});
	});

	describe('PopulateMenu Reducers', () => {
		it('returns LOADING when populatingmenu', () => {
			const initialState = {
				addedMealData: null,
				status: '',
				error: ''
			};
			const state = PopulateMenuReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				addedMealData: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not populating the menu', () => {
			const initialState = {
				addedMealData: null,
				status: '',
				error: ''
			};
			const state = PopulateMenuReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				addedMealData: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during populating menu', () => {
			const initialState = {
				addedMealData: null,
				status: 'ERROR',
				error: 'An error occured while trying to add new food item to menu, please try again.'
			};
			const state = PopulateMenuReducer(initialState, {
				type: 'POPULATE_MENU_ERROR',
				payload: 'An error occured while trying to add new food item to menu, please try again.'
			});
			expect(state).to.eql({
				addedMealData: null,
				status: 'ERROR',
				error: 'An error occured while trying to add new food item to menu, please try again.'
			});
		});

		it('returns updated state after admin populates menu', () => {
			const initialState = {
				addedMealData: null,
				status: '',
				error: ''
			};
			const state = PopulateMenuReducer(initialState, {
				type: 'POPULATE_MENU_SUCCESS',
				payload: 'New food item added to menu successfully.'
			});
			expect(state).to.eql({
				addedMealData: 'New food item added to menu successfully.',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default populate menu state if no action is specified', () => {
			const initialState = {
				addedMealData: null,
				status: '',
				error: ''
			};
			const state = PopulateMenuReducer(initialState, {
				type: '',
				payload: {
					addedMealData: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				addedMealData: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial populate menu state', () => {
			expect(PopulateMenuReducer(undefined, {})).to.eql({
				addedMealData: null,
				status: '',
				error: ''
			});
		});
	});

	describe('DeleteMenu Reducers', () => {
		it('returns LOADING when deleting food item from the menu', () => {
			const initialState = {
				deletedMealData: null,
				status: '',
				error: ''
			};
			const state = DeletedMenuReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				deletedMealData: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not deleting food item from the menu', () => {
			const initialState = {
				deletedMealData: null,
				status: '',
				error: ''
			};
			const state = DeletedMenuReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				deletedMealData: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during deleting food item from the menu', () => {
			const initialState = {
				deletedMealData: null,
				status: 'ERROR',
				error: 'An error occured while trying to delete the item, from the menu please try again.'
			};
			const state = DeletedMenuReducer(initialState, {
				type: ' DELETE_MENU_ERROR',
				payload: 'An error occured while trying to delete the item, from the menu please try again.'
			});
			expect(state).to.eql({
				deletedMealData: null,
				status: 'ERROR',
				error: 'An error occured while trying to delete the item, from the menu please try again.'
			});
		});

		it('returns updated state after admin deletes food item from the menu', () => {
			const initialState = {
				deletedMealData: null,
				status: '',
				error: ''
			};
			const state = DeletedMenuReducer(initialState, {
				type: 'DELETE_MENU_SUCCESS',
				payload: 'Item with id => 1, deleted successfully.'
			});
			expect(state).to.eql({
				deletedMealData: 'Item with id => 1, deleted successfully.',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default delete food item from menu state if no action is specified', () => {
			const initialState = {
				deletedMealData: null,
				status: '',
				error: ''
			};
			const state = DeletedMenuReducer(initialState, {
				type: '',
				payload: {
					deletedMealData: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				deletedMealData: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial all delete menu state', () => {
			expect(DeletedMenuReducer(undefined, {})).to.eql({
				deletedMealData: null,
				status: '',
				error: ''
			});
		});
	});

	describe('Cloudinary Reducers', () => {
		it('returns LOADING when uploading image to cloudinary', () => {
			const initialState = {
				imgurl: null,
				status: '',
				error: ''
			};
			const state = CloudinaryReducer(initialState, {
				type: 'START_LOADING'
			});
			expect(state).to.eql({
				imgurl: null,
				status: 'LOADING',
				error: ''
			});
		});

		it('returns NOTLOADING when not uploading image to cloudinary', () => {
			const initialState = {
				imgurl: null,
				status: '',
				error: ''
			};
			const state = CloudinaryReducer(initialState, {
				type: 'STOP_LOADING'
			});
			expect(state).to.eql({
				imgurl: null,
				status: 'NOTLOADING',
				error: ''
			});
		});

		it('returns status error when an error occurs during uploading image to cloudinary', () => {
			const initialState = {
				imgurl: null,
				status: 'ERROR',
				error: 'Failed to upload image'
			};
			const state = CloudinaryReducer(initialState, {
				type: 'CLOUDINARY_IMAGE_UPLOAD_ERROR',
				payload: 'Failed to upload image'
			});
			expect(state).to.eql({ imgurl: null, status: 'ERROR', error: 'Failed to upload image' });
		});

		it('returns updated state after admin uploads image to cloudinary', () => {
			const initialState = {
				imgurl: null,
				status: '',
				error: ''
			};
			const state = CloudinaryReducer(initialState, {
				type: 'CLOUDINARY_IMAGE_UPLOAD_SUCCESS',
				payload: 'https://res.cloudinary.com/pato/image/upload/v1548575560/jmyht9if1sqlfe0rbxem.jpg'
			});
			expect(state).to.eql({
				imgurl: 'https://res.cloudinary.com/pato/image/upload/v1548575560/jmyht9if1sqlfe0rbxem.jpg',
				status: 'SUCCESS',
				error: ''
			});
		});

		it('returns default image upload state if no action is specified', () => {
			const initialState = {
				imgurl: null,
				status: '',
				error: ''
			};
			const state = CloudinaryReducer(initialState, {
				type: '',
				payload: {
					imgurl: null,
					status: '',
					error: ''
				}
			});
			expect(state).to.eql({
				imgurl: null,
				status: '',
				error: ''
			});
		});
		it('should return the initial image upload state', () => {
			expect(CloudinaryReducer(undefined, {})).to.eql({
				imgurl: null,
				status: '',
				error: ''
			});
		});
	});
});
