import * as actionTypes from '../actions/types';

export default (
  state = {
    error: null,
    percent: null,
    showProgress: false,
    image: null,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.UPLOADING_START:
      return {
        ...state,
        percent: 0,
        showProgress: true,
      };

    case actionTypes.UPLOADING_SUCCESS:
      return {
        ...state,
        error: false,
        percent: null,
        showProgress: false,
      };

    case actionTypes.UPLOADING_FAIL:
      return {
        ...state,
        error: action.payload,
        showProgress: false,
      };

    case actionTypes.UPLOADING:
      return {
        ...state,
        percent: action.payload,
        showProgress: true,
      };

    case actionTypes.GET_DATA:
      return {
        ...state,
        image: action.payload,
      };

    default:
      return state;
  }
};
