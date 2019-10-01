import Axios from 'axios';
import {
  START_LOADING,
  STOP_LOADING,
  COMPLETE_ORDERS_SUCCESS,
  COMPLETE_ORDERS_ERROR,

} from './actionTypes';

const CompleteOrders = (role, token, val) => (dispatch) => {
  dispatch({
    type: START_LOADING
  });
  return Axios.put(`${process.env.BASE_URL_PROD}/api/v1/orders/${val}?role=${role}&token=${token}`, {
    status: 'complete',
  })
    .then((response) => {
      dispatch({
        type: STOP_LOADING
      });
      if (response.data.status === 'success') {
        dispatch({
          type: COMPLETE_ORDERS_SUCCESS,
          payload: response.data.data.message.split(' ')[6].split('')[0]
        });
      }
      // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      dispatch({
        type: COMPLETE_ORDERS_ERROR,
        payload: 'An error occured while trying to update the order, please try again',
      });
    })
}

export default CompleteOrders;
