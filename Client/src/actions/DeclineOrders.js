import Axios from 'axios';
import { 
    START_LOADING,
    STOP_LOADING,
    DECLINE_ORDERS_SUCCESS,
    DECLINE_ORDERS_ERROR,

} from './actionTypes';

const DeclineOrders = (role, token, val) => (dispatch) => {
    dispatch({
        type: START_LOADING
    });
    return Axios.put(`${process.env.BASE_URL_PROD}/api/v1/orders/${val}?role=${role}&&token=${token}`, {
        status: 'cancelled',
    })
        .then((response) => {
            dispatch({
                type: STOP_LOADING
            }); 
            if (response.data.status === 'success') {
                dispatch({
                    type: DECLINE_ORDERS_SUCCESS,
                    payload: response.data.data.message.split(' ')[6].split('')[0]
                });
            }
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: DECLINE_ORDERS_ERROR,
                payload: 'An error occured while trying to update the order, please try again',
            });
        })
}

export default DeclineOrders;
