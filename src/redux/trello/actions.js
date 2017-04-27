import { SET_MARKDOWN_RENDER, FETCH_CARDS, SET_CONTENT, BOARD_ID } from '../constants';
import { authorize, getMyCards, getMySection, getAllCards } from '../../services/api';

const makeFetchAction = (status, data) => {
  return {
    type: FETCH_CARDS,
    payload: {
      status: status,
      data: data,
      loading: true,
    },
  };
};

const makeSetContentAction = (content) => {
  return {
    type: SET_CONTENT,
    payload: {
      content,
      loading: false,
    },
  };
};

export const setMarkdownRender = (bool) => {
  return {
    type: SET_MARKDOWN_RENDER,
    payload: {
      renderMarkdown: bool,
    },
  };
};

export const fetchMyCards = () => {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch(makeFetchAction('authError'));

    const apiFailure = (error) =>
      dispatch(makeFetchAction('apiError', error));

    const authenticationSuccess = () => {
      dispatch(makeFetchAction('authenticated'));
      getMyCards(BOARD_ID)
        .then((content) => dispatch(makeSetContentAction(content)))
        .catch(apiFailure);
    };
    authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });

    return makeFetchAction('request');
  };
};

export const fetchMySection = () => {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch(makeFetchAction('authError'));

    const apiFailure = (error) =>
      dispatch(makeFetchAction('apiError', error));

    const authenticationSuccess = () => {
      dispatch(makeFetchAction('authenticated'));
      getMySection(BOARD_ID)
        .then((content) => dispatch(makeSetContentAction(content)))
        .catch(apiFailure);
    };
    authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });

    return makeFetchAction('request');
  };
};

export const fetchAllCards = () => {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch(makeFetchAction('authError'));

    const apiFailure = (error) =>
      dispatch(makeFetchAction('apiError', error));

    const authenticationSuccess = () => {
      dispatch(makeFetchAction('authenticated'));
      getAllCards(BOARD_ID)
        .then((content) => dispatch(makeSetContentAction(content)))
        .catch(apiFailure);
    };

    authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });

    return makeFetchAction('request');
  };
};
