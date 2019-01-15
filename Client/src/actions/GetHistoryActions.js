import Axios from 'axios';
import { 
    START_LOADING,
    STOP_LOADING,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILED,
    GET_HISTORY_ERROR
} from './actionTypes';

const token = window.localStorage.getItem('token');
const id = window.localStorage.getItem('id');

const GetHistory = () => (dispatch) => {
    dispatch({
        type: START_LOADING
    });
    return Axios.get(`https://fast-food-fast.herokuapp.com/api/v1/users/${id}/orders?token=${token}`)
        .then((response) => {
            dispatch({
                type: STOP_LOADING
            });
            if (response.data.status === 'fail') {
                dispatch({
                    type: GET_HISTORY_FAILED,
                    payload: 'Failed to authenticate user token'
                });
            }
            else if (response.data.status === 'success') {
                dispatch({
                    type: GET_HISTORY_SUCCESS,
                    payload: response.data.data.history
                });
            }
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: GET_HISTORY_ERROR,
                payload: 'An error occured while retrieving all your orders history, please try again',
            });
        })
}

export default GetHistory;
