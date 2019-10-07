import Axios from 'axios';
import {
  START_LOADING,
  STOP_LOADING,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
  GET_ORDERS_ERROR,
} from './actionTypes';

const GetAllOrders = (role, token) => (dispatch) => {
  dispatch({
    type: START_LOADING
  });
  return Axios.get(`${process.env.BASE_URL_PROD}/api/v1/orders/?role=${role}&token=${token}`)
    .then((response) => {
      dispatch({
        type: STOP_LOADING
      });
      if (response.data.status === 'fail') {
        dispatch({
          type: GET_ORDERS_FAILED,
          payload: 'Failed to authenticate user token'
        });
      }
      else if (response.data.status === 'success') {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          payload: response.data.data.orders
        });
      }
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      dispatch({
        type: GET_ORDERS_ERROR,
        payload: 'An error occured while retrieving all orders, please try again',
      });
    })
}

export default GetAllOrders;
