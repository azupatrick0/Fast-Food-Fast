import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../public/styles/orderStyles.css';
import { GetMenu, MakeOrder } from '../actions/index';
import cartSystem from '../../js/utils/cartSystem';
import removeDuplicate from '../../js/utils/removeDuplicate';
import isBelowOne from '../../js/utils/isBelowOne';

const userid = window.localStorage.getItem('id');
const token = window.localStorage.getItem('token');
const name = window.localStorage.getItem('name');
const cart = [];
const newCart = [];
const allQuantity = [];

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
        this.feedback2 = React.createRef();
        this.onPlus = this.onPlus.bind(this);
        this.onAddToCart = this.onAddToCart.bind(this);
        this.onDeliveryDate = this.onDeliveryDate.bind(this);
        this.onMinus = this.onMinus.bind(this);
        this.onOrderAMeal = this.onOrderAMeal.bind(this);
        this.onReady =this.onReady.bind(this);
        this.onShowCart = this.onShowCart.bind(this);
    }

    onPlus(val) {
        document.querySelector(`.td4-cart${val}`).innerHTML = +(document.querySelector(`.td4-cart${val}`).innerHTML) + 1;
        document.querySelector(`.td3-cart${val}`).innerHTML = +(document.querySelector(`.td3-meal${val}`).innerHTML) *
            document.querySelector(`.td4-cart${val}`).innerHTML;
        cartSystem(val, cart, userid);
        removeDuplicate(cart, val);

    }

    onMinus(val) {
        document.querySelector(`.td4-cart${val}`).innerHTML -= 1;
        document.querySelector(`.td3-cart${val}`).innerHTML -= +(document.querySelector(`.td3-meal${val}`).innerHTML);
        cartSystem(val, cart, userid);
        removeDuplicate(cart, val);
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
            this.feedback.current.style.display = 'block';
        } else {
            cart.map((mealObject) => {
                if ((Object.keys(mealObject)).length > 0) {
                    allQuantity.push(Number(Object.values(mealObject)[5]));
                }
            });
            if (allQuantity.every(isBelowOne)) {
                this.feedback.current.style.display = 'block';
            } else {
                cart.map((mealObject) => {
                    if ((Object.keys(mealObject)).length !== 0) {
                        Object.assign(mealObject, {
                            location: document.querySelector('.location').value,
                        });
                    }
                })
            this.props.act(MakeOrder(cart, token, name));
            document.querySelector('.spinner').style.display = 'block';
            window.location.href = 'https://fast-food-fast.herokuapp.com/history'
            }
        }
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
                quantity: document.querySelector(`.td4-cart${val}`).innerHTML,
                amount: document.querySelector(`.td3-cart${val}`).innerHTML,
            });
        }, 1000)
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        this.props.act(GetMenu(token));
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
        const {status, error, statusOrder, errorOrder, orderResponse, data} = this.props;
        // eslint-disable-next-line react/prop-types
        return this.props.children({
            state: this.state,
            modal: this.modal,
            firstTable: this.firstTable,
            secondTable: this.secondTable,
            spinner: this.spinner,
            cart: this.cart,
            toggleCart: this.toggleCart,
            feedback: this.feedback,
            feedback2: this.feedback2,
            status,
            error,
            statusOrder,
            errorOrder,
            orderResponse,
            data,
            newCart,
            onPlus: this.onPlus,
            onMinus: this.onMinus,
            onAddToCart: this.onAddToCart,
            onDeliveryDate: this.onDeliveryDate,
            onOrderAMeal: this.onOrderAMeal,
            onReady: this.onReady,
            onShowCart: this.onShowCart,
        })
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
