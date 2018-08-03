import { BOARD_ID } from '../../config/trello.json';
import { authorize, getMyCards, getMySection, getAllCards } from '../../services/api';
import { SET_MARKDOWN_RENDER, FETCH_CARDS, LOGIN_USER } from '../constants';

const asyncAction = (asyncConstants, promise, data, meta) => ({
  types: asyncConstants,
  payload: {
    promise: promise(data),
    data,
    meta,
  },
});

export const setContentAction = (content) => {
  return {
    type: SET_CONTENT,
    payload: {
      content,
    },
  };
};

export const setMarkdownRenderAction = (bool) => {
  return {
    type: SET_MARKDOWN_RENDER,
    renderMarkdown: bool,
  };
};

export const getMyCardsAction = () => {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch({
        type: LOGIN_USER.FAILURE,
      });
    const authenticationSuccess = () => {
      return dispatch(asyncAction(FETCH_CARDS, getMyCards, BOARD_ID));
    };
    authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });
  };
};

export const getMySectionAction = () => {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch({
        type: LOGIN_USER.FAILURE,
      });
    const authenticationSuccess = () => {
      return dispatch(asyncAction(FETCH_CARDS, getMySection, BOARD_ID));
    };
    authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });
  };
};

export const getAllCardsAction = () => {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch({
        type: LOGIN_USER.FAILURE,
      });
    const authenticationSuccess = () => {
      return dispatch(asyncAction(FETCH_CARDS, getAllCards, BOARD_ID));
    };

    authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });
  };
};
