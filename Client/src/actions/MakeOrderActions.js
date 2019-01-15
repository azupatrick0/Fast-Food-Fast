import { 
    START_LOADING,
    STOP_LOADING,
    ORDER_MEAL_SUCCESS,
    ORDER_MEAL_FAILED,
    ORDER_MEAL_ERROR
} from './actionTypes';

const token = window.localStorage.getItem('token');

const MakeOrder = (cart) => (dispatch) => {
    cart.forEach((order) => {
        if (Object.keys(order).length > 0) {
            dispatch({
                type: START_LOADING
            });
            return fetch(`https://fast-food-fast.herokuapp.com/api/v1/orders?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menuid: order.menuid,
                    meal: order.meal,
                    imgurl: order.imgurl,
                    userid: order.userid,
                    name: order.name,
                    quantity: order.quantity,
                    amount: order.amount,
                    location: order.location,
                }),
            })
                .then(res => res.json())
                .then((result) => {
                    dispatch({
                        type: STOP_LOADING
                    });
                    if (result.status === 'fail') {
                        dispatch({
                            type: ORDER_MEAL_FAILED,
                            payload: 'Failed to authenticate user token'
                        });
                    } else if (result.status === 'success') {
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
