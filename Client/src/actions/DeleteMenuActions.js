
import Axios from 'axios';

import {
  DELETE_MENU_SUCCESS,
  DELETE_MENU_ERROR
} from './actionTypes';

const DeleteMenu = (itemId, role, token) => (dispatch) => {
  return Axios.delete(`${process.env.BASE_URL_PROD}/api/v1/menu/items/${itemId}?role=${role}&token=${token}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: DELETE_MENU_SUCCESS,
          payload: response.data.data.message
        });
      }
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      dispatch({
        type: DELETE_MENU_ERROR,
        payload: 'An error occured while trying to delete the item, from the menu please try again.',
      });
    })
}

export default DeleteMenu;
