import Axios from 'axios';

import {
  UPDATE_MENU_SUCCESS,
  UPDATE_MENU_ERROR
} from './actionTypes';

const UpdateMenu = (itemId, role, token, meal, price, imgurl) => (dispatch) => {
  return Axios.put(`${process.env.BASE_URL_PROD}/api/v1/menu/${itemId}?role=${role}&token=${token}`, {
    meal,
    price,
    imgurl
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: UPDATE_MENU_SUCCESS,
          payload: response.data.data.message
        });
      }
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      dispatch({
        type: UPDATE_MENU_ERROR,
        payload: 'An error occured while trying to update the item, please try again.',
      });
    })
}

export default UpdateMenu;
