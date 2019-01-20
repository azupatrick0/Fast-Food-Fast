import Axios from 'axios';

import { 
    START_LOADING,
    STOP_LOADING,
    GET_MENU_SUCCESS,
    GET_MENU_FAILED,
    GET_MENU_ERROR
} from './actionTypes';

const GetMenu = (token) => (dispatch) => {
    dispatch({
        type: START_LOADING
    });
    return Axios.get(`${process.env.BASE_URL_PROD}/api/v1/menu?token=${token}`)
        .then((response) => {
            dispatch({
                type: STOP_LOADING
            });
            if (response.data.status === 'fail') {
                dispatch({
                    type: GET_MENU_FAILED,
                    payload: 'Failed to authenticate user token'
                });
            }
            else if (response.data.status === 'success') {
                dispatch({
                    type: GET_MENU_SUCCESS,
                    payload: response.data.data.items
                });
            }
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: GET_MENU_ERROR,
                payload: 'An error occured while retrieving available menu, please try again',
            });
        })
}

export default GetMenu;
