import Axios from 'axios';
import { 
    START_LOADING,
    STOP_LOADING,
    ORDER_MEAL_SUCCESS,
    ORDER_MEAL_FAILED,
    ORDER_MEAL_ERROR
} from './actionTypes';

const MakeOrder = (cart, token, name ) => (dispatch) => {
    cart.forEach((order) => {
        if (Object.keys(order).length > 0 && Object.values(order)[5] > 0) {
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
                    location: order.location,
            }).then((response) => {
                    dispatch({
                        type: STOP_LOADING
                    });
                    if (response.data.status === 'fail') {
                        dispatch({
                            type: ORDER_MEAL_FAILED,
                            payload: 'Failed to authenticate user token'
                        });
                    } else if (response.data.status === 'success') {
                        dispatch({
                            type: ORDER_MEAL_SUCCESS,
                            payload: 'Your order has been processed, thank you'
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                    dispatch({
                        type: ORDER_MEAL_ERROR,
                        payload: 'An error occured while trying to process your order, please try again',
                    });
                })
        }
    })
}

export default MakeOrder;
