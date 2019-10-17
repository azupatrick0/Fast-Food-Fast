import Axios from 'axios';
import {
  START_LOADING,
  STOP_LOADING,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_FAILED,
  GET_HISTORY_ERROR
} from './actionTypes';

const GetHistory = (token, id) => (dispatch) => {
  dispatch({
    type: START_LOADING
  });
  return Axios.get(`${process.env.BASE_URL_PROD}/api/v1/users/${id}/orders?token=${token}`)
    .then((response) => {
      dispatch({
        type: STOP_LOADING
      });
      if (response.data.status === 'success') {
        dispatch({
          type: GET_HISTORY_SUCCESS,
          payload: response.data.data.history
        });
      }
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: GET_HISTORY_FAILED,
          payload: 'You are not logged in, please login'
        });
      } else if (error.response && error.response.status === 404) {
        dispatch({
          type: GET_HISTORY_FAILED,
          payload: 'You have no history of ordered meals yet, make an'
        });
      }
      else
        dispatch({
          type: GET_HISTORY_ERROR,
          payload: 'An error occured while retrieving all your orders history, please try again',
        });
    })
}

export default GetHistory;
