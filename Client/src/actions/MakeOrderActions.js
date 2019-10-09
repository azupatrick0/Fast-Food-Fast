import Axios from 'axios';
import { toast } from 'react-toastify';
import { START_LOADING, STOP_LOADING, ORDER_MEAL_SUCCESS, ORDER_MEAL_ERROR } from './actionTypes';

toast.configure();

const makeOrder = (cart, token, name, history) => (dispatch) => {
  cart.map(order => {
    dispatch({
      type: START_LOADING
    });
    return Axios.post(`${process.env.BASE_URL_PROD}/api/v1/orders?token=${token}`, {
      menuid: order.menuid,
      meal: order.meal,
      imgurl: order.imgurl,
      userid: order.userid,
      name,
      quantity: order.quantity,
      amount: order.amount,
      location: order.location
    })
      .then((response) => {
        dispatch({
          type: STOP_LOADING
        });
        if (response.data.status === 'success') {
          toast.success('Order made successfully');
          setTimeout(() => history.push('/history'), 2000);
          dispatch({
            type: ORDER_MEAL_SUCCESS,
            payload: 'Your order has been processed, thank you'
          });
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        dispatch({
          type: ORDER_MEAL_ERROR,
          payload: 'An error occured while trying to process your order, please try again'
        });
      });
  });
};

export default makeOrder;
