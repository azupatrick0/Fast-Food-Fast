import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import moxios from 'moxios';
import fetchMock from 'fetch-mock';
import { SignupAUser, SigninAUser, GetMenu, GetHistory, GetAllOrders, AcceptOrders, DeclineOrders, CompleteOrders, UpdateMenu, PopulateMenu, DeleteMenu, CloudinaryImageUpload } from '../src/actions/index';
import {
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILED,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAILED,
    GET_MENU_SUCCESS,
    GET_MENU_FAILED,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILED,
} from '../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const meal = 'Frutties';
const price = 1000;
const imgurl = 'https://res.cloudinary.com/pato/image/upload/v1548545164/fe39xu5xp6ncnpzeotc7.jpg';
const userDetails =
{
    name: "Nikita Cheng",
    email: "email6@email.com",
    password: "password",
    role: "user"
};

const userDetails2 = {
    email: "email@email.com",
    password: "password"
};

const responseData = {
    status: "success",
    data: {
        message: "New user created",
        userDetails: {
            id: 11,
            name: "Nikita Cheng",
            email: "email6@email.com",
            password: "$2b$10$J5GlxL1lVwr133vQrK1jvO2IJMM8EHJS1Ly9dL/d0xxnjExhbJkzG",
            role: "user",
            createdat: "2018-10-21T08:06:36.169Z"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsNUBlbWFpbC5jb20iLCJpYXQiOjE1NDAxMDkxOTYsImV4cCI6MTU0MDE5NTU5Nn0.qOg1WRqiYfU3Na29jL-7aGakUF3KQhI9XvD3R4rp4qw"
    }
};

const responseData2 = {
    status: "success",
    data: {
        message: "Welcome, Azu Patrick",
        userDetails: {
            id: 1,
            name: "Azu Patrick",
            email: "email@email.com",
            password: "$2b$10$elPlTA1joXI0FJAGmgLPGemIPXKsSlFWMuraqDZZsLMcfEFLjX7Ym",
            role: "admin",
            createdat: "2018-10-04T17:26:33.608Z"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoxNTM4NzYwNDgxfQ.FUwub-imRWXVAUItPQkxA4nOcIYtzxiA_nxdvICJ0g8"
    }
}

const menu = {
    status: 'success',
    data: {
      message: 'Available menu returned successfully.',
      items: [
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
    }
  }
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
  }
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
  }
  

describe('Fast-Food-Fast Actions Test Suite', () => {
    // FROM: https://www.npmjs.com/package/node-localstorage
    beforeEach(() => {
        moxios.install();
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ'
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            // eslint-disable-next-line no-global-assign
            localStorage = new LocalStorage('./scratch');
        }
        localStorage.setItem('token', token);
    })
    afterEach(() => moxios.uninstall());

    describe('Signup Actions', () => {
        const store = mockStore({});

        it('creates USER_SIGNUP_SUCCESS when user has been signed up', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/auth/signup`, {
                status: 201,
                response: responseData,
            });

            const expected = [{
                type: USER_SIGNUP_SUCCESS,
                payload: responseData,

            }]


            store.dispatch(SignupAUser(userDetails)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('creates USER_SIGNUP_FAILED when user fails authentication during sign up', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/auth/signup`, {
                status: 409,
                response: `Email => ${userDetails.email} already in use, please choose another.`,
            });

            const expected = [{
                type: USER_SIGNUP_FAILED,
                payload: `Email => ${userDetails.email} already in use, please choose another.`,

            }]


            store.dispatch(SignupAUser(userDetails)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })

    describe('Signin Actions', () => {
        const store = mockStore({});

        it('creates USER_SIGNIN_SUCCESS when user has been signed in', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/auth/login`, {
                status: 200,
                response: responseData2,
            });

            const expected = [{
                type: USER_SIGNIN_SUCCESS,
                payload: responseData2,

            }]


            store.dispatch(SigninAUser(userDetails2)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('creates USER_SIGNIN_FAILED when user fails authentication during signed in', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/auth/login`, {
                status: 401,
                response: 'Email or password incorrect',
            });

            const expected = [{
                type: USER_SIGNIN_FAILED,
                payload: 'Email or password incorrect',

            }]

            store.dispatch(SigninAUser(userDetails2)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
        
    })

    describe('GetMenu Actions', () => {
        const store = mockStore({});
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ';

        it('creates GET_MENU_SUCCESS, when menu is retrieved successfully', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/menu?token=${token}`, {
                status: 200,
                response: menu,
            });

            const expected = [{
                type: GET_MENU_SUCCESS,
                payload: menu,

            }]

            store.dispatch(GetMenu(token)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('creates GET_MENU_FAILED when menu is not retrieved successfully', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/menu`, {
                status: 401,
                response: 'Failed to authenticate user token',
            });

            const expected = [{
                type: GET_MENU_FAILED,
                payload: 'Failed to authenticate user token',

            }]

            store.dispatch(GetMenu(token)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })

    describe('GetHistory Actions', () => {
        const store = mockStore({});
        const id = 1;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ';

        it('creates GET_HISTORY_SUCCESS, when history is retrieved successfully', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/users/${id}/orders?token=${token}`, {
                status: 200,
                response: history,
            });

            const expected = [{
                type: GET_HISTORY_SUCCESS,
                payload: history,

            }]

            store.dispatch(GetHistory()).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('creates GET_HISTORY_FAILED when menu is not retrieved successfully', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/menu`, {
                status: 401,
                response: 'Failed to authenticate user token',
            });

            const expected = [{
                type: GET_HISTORY_FAILED,
                payload: 'Failed to authenticate user token',

            }]

            store.dispatch(GetHistory()).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })

    describe('GetAllOrders Actions', () => {
        const store = mockStore({});
        const role = 'admin';
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ';

        it('creates GET_ORDERS_SUCCESS, when all orders are retrieved successfully', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/orders/?role=${role}&token=${token}`, {
                status: 200,
                response: allOrders,
            });

            const expected = [{
                type: 'GET_ORDERS_SUCCESS',
                payload: history,

            }]

            store.dispatch(GetAllOrders(role, token)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('creates GET_ORDERS_FAILED when all orders are not retrieved successfully', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/orders/?role=${role}&token=${token}`, {
                status: 401,
                response: 'Failed to authenticate user token',
            });

            const expected = [{
                type: 'GET_ORDERS_FAILED',
                payload: 'Failed to authenticate user token',

            }]

            store.dispatch(GetAllOrders(role, token)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })


    describe('AcceptOrders Actions', () => {
        const store = mockStore({});
        const role = 'admin';
        const val = 148;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ';

        it('creates ACCEPT_ORDERS_SUCCESS, when an order is accepted by admin', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/orders/${val}?role=${role}&token=${token}`, {
                status: 200,
                response: '1',
            });

            const expected = [{
                type: 'ACCEPT_ORDERS_SUCCESS',
                payload: '1',

            }]

            store.dispatch(AcceptOrders(role, token, val)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('creates ACCEPT_ORDERS_ERROR when an error occur during accepting a users order', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/orders/${val}?role=${role}&token=${token}`, {
                status: 500,
                response: 'An error occured while trying to update the order, please try again',
            });

            const expected = [{
                type: 'ACCEPT_ORDERS_ERROR',
                payload: 'An error occured while trying to update the order, please try again',

            }]

            store.dispatch(AcceptOrders(role, token, val)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })

    describe('DeclineOrders Actions', () => {
        const store = mockStore({});
        const role = 'admin';
        const val = 147;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ';

        it('creates DECLINE_ORDERS_SUCCESS, when an order is declined by admin', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/orders/${val}?role=${role}&token=${token}`, {
                status: 200,
                response: '1',
            });

            const expected = [{
                type: 'DECLINE_ORDERS_SUCCESS',
                payload: '1',

            }]

            store.dispatch(DeclineOrders(role, token, val)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('creates DECLINE_ORDERS_ERROR when an error occur during adeclining a users order', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/orders/${val}?role=${role}&token=${token}`, {
                status: 500,
                response: 'An error occured while trying to update the order, please try again',
            });

            const expected = [{
                type: 'DECLINE_ORDERS_ERROR',
                payload: 'An error occured while trying to update the order, please try again',

            }]

            store.dispatch(DeclineOrders(role, token, val)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })


    describe('CompleteOrders Actions', () => {
        const store = mockStore({});
        const role = 'admin';
        const val = 148;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTUzODY3NDA4MSwiZXhwIjoyMDAwMDAwMDAwfQ.WS29iggWiAknaAnPDXsGku-F2NXBU33iBAQE-Hb6zSQ';

        it('creates COMPLETE_ORDERS_SUCCESS, when an order is completed by admin', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/orders/${val}?role=${role}&token=${token}`, {
                status: 200,
                response: '1',
            });

            const expected = [{
                type: 'COMPLETE_ORDERS_SUCCESS',
                payload: '1',

            }]

            store.dispatch(CompleteOrders(role, token, val)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('creates COMPLETE_ORDERS_ERROR when an error occur during completing a users order', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/orders/${val}?role=${role}&token=${token}`, {
                status: 500,
                response: 'An error occured while trying to update the order, please try again',
            });

            const expected = [{
                type: 'COMPLETE_ORDERS_ERROR',
                payload: 'An error occured while trying to update the order, please try again',

            }]

            store.dispatch(CompleteOrders(role, token, val)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })

    describe('UpdateMenu Actions', () => {
        const store = mockStore({});
        const role = 'admin';
        const itemId= 1;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTU0ODU2ODczNiwiZXhwIjoxNTQ4NjU1MTM2fQ.JBhxffA8umRWA-z3gf7i8maj9Zcw8WoBZC2PKentI6c';

        it('returns UPDATE_MENU_SUCCESS, when a food item is updated by admin', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/menu/${itemId}?role=${role}&token=${token}`, {
                status: 200,
                response: 'Item with id => 148, updated successfully.',
            });

            const expected = [{
                type: 'UPDATE_MENU_SUCCESS',
                payload: 'Item with id => 148, updated successfully.',

            }]

            store.dispatch(UpdateMenu(itemId, role, token, meal, price, imgurl)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('returns UPDATE_MENU_ERROR when an error occur during updating food item in the menu', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/menu/${itemId}?role=${role}&token=${token}`, {
                status: 500,
                response: 'An error occured while trying to update the item, please try again.',
            });

            const expected = [{
                type: 'UPDATE_MENU_ERROR',
                payload: 'An error occured while trying to update the item, please try again.',

            }]

            store.dispatch(UpdateMenu(itemId, role, token, meal, price, imgurl)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })

    describe('PopulateMenu Actions', () => {
        const store = mockStore({});
        const role = 'admin';
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTU0ODU2ODczNiwiZXhwIjoxNTQ4NjU1MTM2fQ.JBhxffA8umRWA-z3gf7i8maj9Zcw8WoBZC2PKentI6c';

        it('returns POPULATE_MENU_SUCCESS, when a food item is added to the menu by admin', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/menu?role=${role}&token=${token}`, {
                status: 200,
                response: 'New food item added to menu successfully.',
            });

            const expected = [{
                type: 'POPULATE_MENU_SUCCESS',
                payload: 'New food item added to menu successfully.',

            }]

            store.dispatch(PopulateMenu(role, token, meal, price, imgurl)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('returns POPULATE_MENU_ERROR when an error occurs during an admin adding a food item to the menu', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/menu?role=${role}&token=${token}`, {
                status: 500,
                response: 'An error occured while trying to update the item, please try again.',
            });

            const expected = [{
                type: 'POPULATE_MENU_ERROR',
                payload: 'An error occured while trying to add new food item to menu, please try again.',

            }]

            store.dispatch(PopulateMenu(role, token, meal, price, imgurl)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })

    describe('DeleteMenu Actions', () => {
        const store = mockStore({});
        const role = 'admin';
        const itemId = 1;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTU0ODU2ODczNiwiZXhwIjoxNTQ4NjU1MTM2fQ.JBhxffA8umRWA-z3gf7i8maj9Zcw8WoBZC2PKentI6c';

        it('returns DELETE_MENU_SUCCESS, when a food item is deleted from the menu by admin', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/menu/items/${itemId}?role=${role}&token=${token}`, {
                status: 200,
                response: 'Item with id => 1, deleted successfully',
            });

            const expected = [{
                type: 'DELETE_MENU_SUCCESS',
                payload: 'Item with id => 1, deleted successfully',

            }]

            store.dispatch(DeleteMenu(itemId, role, token)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('returns DELETE_MENU_ERROR when an error occurs during an admin deleteing a food item from the menu', () => {
            moxios.stubRequest(`${process.env.BASE_URL_PROD}/api/v1/menu/items/${itemId}?role=${role}&token=${token}`, {
                status: 500,
                response: 'An error occured while trying to delete the item, from the menu please try again.',
            });

            const expected = [{
                type: 'DELETE_MENU_ERROR',
                payload: 'An error occured while trying to delete the item, from the menu please try again.',

            }]

            store.dispatch(DeleteMenu(itemId, role, token)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })

    describe('Cloudinary Actions', () => {
        const store = mockStore({});
        const formData = new FormData();
        formData.append('upload_preset', 'kls6oowk');
        beforeEach(() => {
            store.clearActions();
        })
        afterEach(() => {
            fetchMock.restore()
        })
        it('returns CLOUDINARY_IMAGE_UPLOAD_SUCCESS, when an image is uploaded successfully by admin', () => {
            fetchMock.post('https://api.cloudinary.com/v1_1/pato/upload', {
                body: formData,
                response: 'https://res.cloudinary.com/pato/image/upload/v1548545164/fe39xu5xp6ncnpzeotc7.jpg',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const expected = [{
                type: 'CLOUDINARY_IMAGE_UPLOAD_SUCCESS',
                payload: 'https://res.cloudinary.com/pato/image/upload/v1548545164/fe39xu5xp6ncnpzeotc7.jpg',

            }]
           
            store.dispatch(CloudinaryImageUpload(formData)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })

        it('returns CLOUDINARY_IMAGE_UPLOAD_ERROR when an error occurs during an admin uploading an image', () => {
            const formData = new FormData();
            formData.append('upload_preset', 'kls6oowk');
            fetchMock.post('https://api.cloudinary.com/v1_1/pato/upload', {
                body: formData,
                response: 'https://res.cloudinary.com/pato/image/upload/v1548545164/fe39xu5xp6ncnpzeotc7.jpg',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const expected = [{
                type: 'CLOUDINARY_IMAGE_UPLOAD_ERROR',
                payload: 'Failed to upload image',

            }]

            store.dispatch(CloudinaryImageUpload(formData)).then(() => {
                expect(store.getActions()).to.eql(expected)
            })
        })
    })
});
