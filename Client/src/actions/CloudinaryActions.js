import {
  START_LOADING,
  STOP_LOADING,
  CLOUDINARY_IMAGE_UPLOAD_SUCCESS,
  CLOUDINARY_IMAGE_UPLOAD_ERROR
} from './actionTypes';

const apiUrl = 'https://api.cloudinary.com/v1_1/pato/upload';
const CloudinaryImageUpload = (form) => (dispatch) => {
  dispatch({
    type: START_LOADING
  });
  return fetch(apiUrl, {
    method: 'POST',
    body: form,
  })
    .then(res => res.json())
    .then((response) => {
      dispatch({
        type: STOP_LOADING
      });
      dispatch({
        type: CLOUDINARY_IMAGE_UPLOAD_SUCCESS,
        payload: response.secure_url
      });
      // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      dispatch({
        type: CLOUDINARY_IMAGE_UPLOAD_ERROR,
        payload: 'Failed to upload image'
      });
    })
}

export default CloudinaryImageUpload;
