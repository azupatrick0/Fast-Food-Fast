import Axios from 'axios';

import {
  POPULATE_MENU_SUCCESS,
  POPULATE_MENU_ERROR
} from './actionTypes';

const PopulateMenu = (role, token, meal, price, imgurl) => (dispatch) => {
  return Axios.post(`${process.env.BASE_URL_PROD}/api/v1/menu?role=${role}&token=${token}`, {
    meal,
    price,
    imgurl
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: POPULATE_MENU_SUCCESS,
          payload: response.data.data.message
        });
      }
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      dispatch({
        type: POPULATE_MENU_ERROR,
        payload: 'An error occured while trying to add new food item to menu, please try again.',
      });
    })
}

export default PopulateMenu;
