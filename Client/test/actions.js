import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import moxios from 'moxios';
import { SignupAUser, SigninAUser, MakeOrder, GetMenu, GetHistory } from '../src/actions/index';
import {
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILED,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAILED,
    ORDER_MEAL_SUCCESS,
    ORDER_MEAL_FAILED,
    GET_MENU_SUCCESS,
    GET_MENU_FAILED,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILED,
} from '../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

const orderData = [{
    menuid: 1,
    meal: "Fruttie",
    imgurl: "https://res.cloudinary.com/pato/image/upload/v1539986387/yjvhhoun9pajw07zu0dw.jpg",
    userid: 1,
    name: "Azu Patrick",
    quantity: 2,
    amount: 800,
    location: "Lagos"
  },
  {
    menuid: 2,
    meal: "Burger",
    imgurl: "https://res.cloudinary.com/pato/image/upload/v11539986387/yjvhhoun9pajw07zu0dw.jpg",
    userid: 1,
    name: "Azu Patrick",
    quantity: 1,
    amount: 200,
    location: "Lagos"
  }]
  

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

            store.dispatch(GetMenu()).then(() => {
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

            store.dispatch(GetMenu()).then((res) => {
                console.log(res,'??????????')
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
});
