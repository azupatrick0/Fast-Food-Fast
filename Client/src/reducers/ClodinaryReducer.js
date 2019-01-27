import { 
    START_LOADING,
    STOP_LOADING,
    CLOUDINARY_IMAGE_UPLOAD_SUCCESS,
    CLOUDINARY_IMAGE_UPLOAD_ERROR
} from '../actions/actionTypes';

const initialState =  {
    imgurl: null,
    status: '',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING: {
            state = {
                imgurl: null,
                status: 'LOADING',
                error: '',
            }
            break;
        }

        case STOP_LOADING: {
            state = {
                imgurl: null,
                status: 'NOTLOADING',
                error: ''
            }
            break;
        }

        case CLOUDINARY_IMAGE_UPLOAD_SUCCESS: {
            state = {
                imgurl: action.payload,
                status: 'SUCCESS',
                error: '',
            }
            break;
        }

        case CLOUDINARY_IMAGE_UPLOAD_ERROR: {
            state = {
                imgurl: null,
                status: 'ERROR',
                error: action.payload
            }
            break;
        }
        default: {
            state
        }
    }
    return state;
}
