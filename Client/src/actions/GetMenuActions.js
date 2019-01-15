import { 
    START_LOADING,
    STOP_LOADING,
    GET_MENU_SUCCESS,
    GET_MENU_FAILED,
    GET_MENU_ERROR
} from './actionTypes';

const token = window.localStorage.getItem('token');

const GetMenu = () => (dispatch) => {
    dispatch({
        type: START_LOADING
    });
    return fetch(`https://fast-food-fast.herokuapp.com/api/v1/menu?token=${token}`)
      .then(res => res.json())
        .then((response) => {
            dispatch({
                type: STOP_LOADING
            });
            if (response.status === 'fail') {
                dispatch({
                    type: GET_MENU_FAILED,
                    payload: 'Failed to authenticate user token'
                });
            }
            else if (response.status === 'success') {
                dispatch({
                    type: GET_MENU_SUCCESS,
                    payload: response.data.items
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
